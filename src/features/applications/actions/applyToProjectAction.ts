'use server';

import { revalidatePath } from 'next/cache';

import z from 'zod';

import { auth } from '@/auth';
import { MemberRole } from '@/generated/prisma';
import type { ActionState } from '@/lib/constants';
import prisma from '@/lib/prisma';

const FormSchema = z.object({
  requirementId: z.cuid2(),
  coverLetter: z
  .string()
  .trim()
  .normalize()
  .min(100)
  .max(2500)
  .optional(),
});

type FormParams = z.infer<typeof FormSchema>;

export async function applyToProjectAction(formData: FormParams): Promise<ActionState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: `Unauthorized or missing user data!` };
  }
  const userId = session.user.id;

  const { success, data, error } = FormSchema.safeParse(formData);

  // if (!success) {
  //   const fieldErrors = issuesToFieldErrors(error.issues);

  //   return {
  //     success: false,
  //     message: 'Invalid form data!',
  //     fieldErrors,
  //   };
  // }

  try {
    const confirmData = await prisma.application.upsert({
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

    revalidatePath(`/projects/${validatedFields.data.projectId}`);
    return { success: true, message: `Done!` };
  } catch (_) {
    return { success: false, message: `Something went wrong! Try again later!` };
  }
}
