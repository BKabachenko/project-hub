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

interface approveUserProps {
  applicantId: string;
  projectId: string;
  requirementId: string;
}
const applySchema = z.object({
  projectId: z.cuid2(),
  applicantId: z.cuid2(),
  requirementId: z.cuid2(),
});

const approveUserAction = async ({
  projectId,
  applicantId: memberId,
  requirementId,
}: approveUserProps): Promise<ActionState> => {
  const session = await auth();
  if (!session) return { success: false, message: 'Unathoraized user!' };
  const userId = session.user?.id;

  const vData = applySchema.safeParse({
    projectId: projectId,
    memberId: memberId,
    requirementId: requirementId,
  });

  if (!vData.success) {
    return {
      success: false,
      message: 'Please rework mistakes!',
    };
  }

  try {
    await prisma.$transaction(
      async (tx) => {
        const project = await tx.project.findUnique({
          where: {
            id: vData.data.projectId,
          },
          include: {
            projectPositions: {
              where: {
                id: vData.data.requirementId,
              },
              include: {
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

        if (project.projectPositions[0].requiredCount <= project.projectMembers.length) {
          throw new Error('Dont enought empty slots in this position.');
        }

        const isUserInMembers = project.projectMembers.some(
          (member) => member.userId === vData.data.applicantId
        );
        if (isUserInMembers) {
          throw new Error('User is already approved for this role.');
        }

        if (project.projectPositions[0].applications[0].status != 'PENDING') {
          throw new Error('User dont have pending application.');
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
        console.log('all ok');
        throw new Error('test error');
      },
      { isolationLevel: 'RepeatableRead' }
    );
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
  return { success: true, message: 'User successfully approved!' };
};

export default approveUserAction;
