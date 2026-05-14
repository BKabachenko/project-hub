'use server';

import { revalidatePath } from 'next/cache';

import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client-runtime-utils';
import z from 'zod';

import { auth } from '@/auth';
import type { ActionState } from '@/lib/constants';
import prisma from '@/lib/prisma';

export interface ResolveApplicationProps {
  applicantId: string;
  projectId: string;
  requirementId: string;
  action: 'approve' | 'decline';
}
const resolveApplicationSchema = z.object({
  projectId: z.cuid2(),
  applicantId: z.cuid2(),
  requirementId: z.cuid2(),
  action: z.enum(['approve', 'decline']),
});

const resolveApplicationAction = async ({
  projectId,
  applicantId,
  requirementId,
  action,
}: ResolveApplicationProps): Promise<ActionState> => {
  const session = await auth();
  if (!session) return { success: false, message: 'Unauthorized user!' };
  const userId = session.user?.id;

  const vData = resolveApplicationSchema.safeParse({
    projectId: projectId,
    applicantId: applicantId,
    requirementId: requirementId,
    action: action,
  });

  if (!vData.success) {
    return {
      success: false,
      message: 'Please rework mistakes!',
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
            projectPositions: {
              where: {
                id: vData.data.requirementId,
              },
              select: {
                requiredCount: true,
                applications: {
                  where: {
                    userId: vData.data.applicantId,
                  },
                  select: { userId: true, status: true, requirementId: true },
                },
              },
            },
            projectMembers: {
              where: {
                requirementId: vData.data.requirementId,
                status: 'ACTIVE',
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

        if (project.status != 'ACTIVE') {
          throw new Error('Project does not active.');
        }

        if (project.projectPositions.length != 1) {
          throw new Error('Application not found.');
        }

        if (project.projectPositions[0].applications[0].status != 'PENDING') {
          throw new Error('User dont have pending application.');
        }

        if (vData.data.action === 'approve') {
          if (project.projectPositions[0].requiredCount <= project.projectMembers.length) {
            throw new Error('Dont enought empty slots in this position.');
          }

          const isUserInMembers = project.projectMembers.some(
            (member) => member.userId === vData.data.applicantId
          );

          if (isUserInMembers) {
            throw new Error('User is already approved for this role.');
          }

          await tx.projectMember.upsert({
            where: {
              userId_requirementId: {
                requirementId: vData.data.requirementId,
                userId: vData.data.applicantId,
              },
            },
            update: {
              status: 'ACTIVE',
            },
            create: {
              userId: vData.data.applicantId,
              projectId: vData.data.projectId,
              requirementId: vData.data.requirementId,
              status: 'ACTIVE',
            },
          });

          await tx.application.update({
            where: {
              userId_requirementId: {
                requirementId: vData.data.requirementId,
                userId: vData.data.applicantId,
              },
            },
            data: {
              status: 'APPROVED',
            },
          });

          return { success: true, message: 'User successfully approved!' };
        }

        if (vData.data.action === 'decline') {
          await tx.application.update({
            where: {
              userId_requirementId: {
                requirementId: vData.data.requirementId,
                userId: vData.data.applicantId,
              },
            },
            data: {
              status: 'DECLINED',
            },
          });

          return { success: true, message: 'User successfully declined!' };
        }

        throw new Error('Unexpected action.');
      },
      { isolationLevel: 'RepeatableRead' }
    );

    revalidatePath('/dashboard');
    return result;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return { success: false, message: 'Known prisma error.' };
    }

    if (error instanceof PrismaClientUnknownRequestError) {
      return { success: false, message: 'Unknown prisma error.' };
    }

    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Unknown error.' };
  }
};

export default resolveApplicationAction;
