'use server';

import z from 'zod';

import { auth } from '@/auth';
import { MemberRole } from '@/generated/prisma';
import type { ActionState } from '@/lib/constants';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface approveUserProps {
  memberId: string;
  projectId: string;
  role: MemberRole;
}
const applySchema = z.object({
  projectId: z.cuid2(),
  memberId: z.cuid2(),
  role: z.enum(MemberRole),
});

const approveUserAction = async ({
  projectId,
  memberId,
  role,
}: approveUserProps): Promise<ActionState> => {
  const session = await auth();
  if (!session) return { success: false, message: 'Unathoraized user!' };
  const userId = session.user?.id;

  const validatedData = applySchema.safeParse({
    projectId: projectId,
    memberId: memberId,
    role: role,
  });

  if (!validatedData.success) {
    return {
      success: false,
      message: 'Please rework mistakes!',
    };
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      projectMembers: {
        where: {
          role: validatedData.data.role,
        },
      },
      projectPositions: {
        where: {
          role: validatedData.data.role,
        },
        select: {
          requiredCount: true,
        },
      },
    },
  });

  if (!project) {
    return { success: false, message: 'Project does not exist.' };
  }

  if (project.authorId !== userId) {
    return { success: false, message: 'You do not have permission to modify this project.' };
  }

  const userApplication = project.projectMembers.find(
    (member) => member.userId === validatedData.data.memberId
  );

  if (!userApplication) {
    return { success: false, message: 'Application not found.' };
  }

  if (userApplication.status === 'APPROVED') {
    return { success: false, message: 'User is already approved for this role.' };
  }

  const positionCount = project.projectPositions[0]?.requiredCount || 0;

  const alreadyInRoleCount = project.projectMembers.filter(
    (member) => member.status === 'APPROVED'
  ).length;

  if (positionCount <= alreadyInRoleCount) {
    return { success: false, message: 'No available slots for this role.' };
  }

  try {
    const result = await prisma.projectMember.updateMany({
      where: {
        projectId: validatedData.data.projectId,
        userId: validatedData.data.memberId,
        role: validatedData.data.role,
        status: 'PENDING',
      },
      data: {
        status: 'APPROVED',
      },
    });

    if (result.count === 0) {
      return {
        success: false,
        message: 'Application is no longer pending or was not found.',
      };
    }
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Failed to update application status.' };
  }
  return { success: true, message: 'User successfully approved!' };
};

export default approveUserAction;
