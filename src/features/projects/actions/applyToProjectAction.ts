'use server';

import { revalidatePath } from 'next/cache';

import z from 'zod';

import { auth } from '@/auth';
import { MemberRole } from '@/generated/prisma';
import type { ActionState } from '@/lib/constants';
import prisma from '@/lib/prisma';

const applySchema = z.object({
  projectId: z.string().min(5),
  memberRole: z.enum(MemberRole, { error: 'Please select real role!' }),
});

export async function applyToProjectAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await auth();
  if (!session) {
    return { success: false, message: `You need to auth before!` };
  }
  if (!session.user || !session.user.id) {
    return { success: false, message: `Something went wrong! Try again later!` };
  }

  const validatedFields = applySchema.safeParse({
    projectId: formData.get('projectId'),
    memberRole: formData.get('memberRole'),
  });

  if (!validatedFields.success) {
    const flatten = z.flattenError(validatedFields.error);
    return {
      success: false,
      message: 'Please rework mistakes!',
      error: flatten.formErrors[0],
      fieldErrors: flatten.fieldErrors,
    };
  }

  const confirmData = await prisma.project.findUnique({
    where: {
      id: validatedFields.data.projectId,
    },
    select: {
      id: true,
      projectMembers: {
        where: {
          userId: session.user.id,
          projectId: validatedFields.data.projectId,
          role: validatedFields.data.memberRole,
        },
        select: {
          role: true,
        },
      },
    },
  });

  if (!confirmData) {
    return { success: false, message: `Project does not exist.` };
  }
  if (confirmData?.projectMembers.length > 0) {
    return { success: false, message: `You already apply for this role.` };
  }

  try {
    await prisma.projectMember.create({
      data: {
        userId: session.user?.id,
        projectId: validatedFields.data.projectId,
        role: validatedFields.data.memberRole,
        status: 'PENDING',
      },
    });

    revalidatePath(`/projects/${validatedFields.data.projectId}`);
    return { success: true, message: `Done!` };
  } catch (_) {
    return { success: false, message: `Something went wrong! Try again later!` };
  }
}
