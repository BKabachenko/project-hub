'use server';

import { revalidatePath } from 'next/cache';

import z from 'zod';

import { auth } from '@/auth';
import { ApplicationStatus, Prisma, ProjectMemberStatus, ProjectStatus } from '@/generated/prisma';
import type { ActionState } from '@/lib/constants';
import prisma from '@/lib/prisma';

const resolveApplicationSchema = z.object({
  projectId: z.cuid(),
  applicationUserId: z.cuid(),
  requirementId: z.cuid(),
  action: z.enum(['approve', 'decline']),
});

export type ResolveApplicationProps = z.infer<typeof resolveApplicationSchema>;

const resolveApplicationAction = async ({
  projectId,
  applicationUserId,
  requirementId,
  action,
}: ResolveApplicationProps): Promise<ActionState> => {
  const session = await auth();
  if (!session) return { success: false, message: 'Unauthorized user!' };
  const userId = session.user?.id;

  const vData = resolveApplicationSchema.safeParse({
    projectId,
    applicationUserId,
    requirementId,
    action,
  });

  if (!vData.success) {
    return {
      success: false,
      message: 'Invalid input data!',
    };
  }

  try {
    const result = await prisma.$transaction(
      async (tx) => {
        const project = await tx.project.findUnique({
          where: {
            id: vData.data.projectId,
          },
          select: {
            authorId: true,
            status: true,
            requirements: {
              where: {
                id: vData.data.requirementId,
              },
              select: {
                requiredCount: true,
                openPositionsCount: true,
                applications: {
                  where: {
                    userId: vData.data.applicationUserId,
                  },
                  select: { userId: true, status: true, requirementId: true },
                },
              },
            },
            projectMembers: {
              where: {
                requirementId: vData.data.requirementId,
                status: ProjectMemberStatus.ACTIVE,
              },
              select: {
                userId: true,
              },
            },
          },
        });

        if (!project) {
          throw new Error('Project does not exist.');
        }

        if (project.authorId !== userId) {
          throw new Error('You do not have permission to modify this project.');
        }

        if (project.status !== ProjectStatus.ACTIVE) {
          throw new Error('Project is not active.');
        }

        if (project.requirements.length !== 1) {
          throw new Error('Application not found.');
        }

        if (project.requirements[0]?.applications[0]?.status !== ApplicationStatus.PENDING) {
          throw new Error('Applicant does not have a pending application.');
        }

        if (vData.data.action === 'approve') {
          if (project.requirements[0].requiredCount <= project.projectMembers.length) {
            throw new Error('Not enough open positions for this role.');
          }

          if (project.requirements[0].openPositionsCount <= 0) {
            throw new Error('Not enough open positions for this role.');
          }

          const isUserInMembers = project.projectMembers.some(
            (member) => member.userId === vData.data.applicationUserId
          );

          if (isUserInMembers) {
            throw new Error('User is already approved for this role.');
          }

          await tx.projectMember.upsert({
            where: {
              userId_requirementId: {
                requirementId: vData.data.requirementId,
                userId: vData.data.applicationUserId,
              },
            },
            update: {
              status: ProjectMemberStatus.ACTIVE,
            },
            create: {
              userId: vData.data.applicationUserId,
              projectId: vData.data.projectId,
              requirementId: vData.data.requirementId,
              status: ProjectMemberStatus.ACTIVE,
            },
          });

          await tx.application.update({
            where: {
              userId_requirementId: {
                requirementId: vData.data.requirementId,
                userId: vData.data.applicationUserId,
              },
            },
            data: {
              status: ApplicationStatus.APPROVED,
            },
          });

          await tx.projectRequirement.update({
            where: { id: vData.data.requirementId },
            data: {
              openPositionsCount: { decrement: 1 },
            },
          });

          return { success: true, message: 'Applicant successfully approved!' };
        }

        if (vData.data.action === 'decline') {
          await tx.application.update({
            where: {
              userId_requirementId: {
                requirementId: vData.data.requirementId,
                userId: vData.data.applicationUserId,
              },
            },
            data: {
              status: ApplicationStatus.DECLINED,
            },
          });

          return { success: true, message: 'Applicant successfully declined!' };
        }

        throw new Error('Unexpected action.');
      },
      { isolationLevel: 'RepeatableRead' }
    );

    revalidatePath('/dashboard');
    revalidatePath(`/projects/${vData.data.projectId}`);
    return result;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, message: 'Database operation failed.' };
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      return { success: false, message: 'Unexpected database error.' };
    }

    if (error instanceof Error) {
      console.error(error);
      return { success: false, message: 'Error.' };
    }
    return { success: false, message: 'An unexpected error occurred.' };
  }
};

export default resolveApplicationAction;
