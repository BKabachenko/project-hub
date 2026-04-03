'use server';

import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import { auth } from '@/auth';
import { MemberRole, ProjectCategory } from '@/generated/prisma';
import type { ActionState } from '@/lib/constants';
import prisma from '@/lib/prisma';

//TODO create authAction

const createSchema = z.object({
  title: z.string().min(5),
  projectId: z.string().min(5),
  description: z.string().min(20),
  category: z.enum(ProjectCategory, { error: 'Please select real category!' }),
  requiredParticipants: z.coerce.number().min(1),
  memberRole: z.enum(MemberRole, { error: 'Please select real role!' }),
});

export async function createProjectAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await auth();

  if (!session) {
    return { success: false, message: `Unauthorized!` };
  }

  if (!session.user || !session.user.id) {
    return { success: false, message: `Something went wrong! Try again later!` };
  }

  const validatedFields = createSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    requiredParticipants: formData.get('requiredParticipants'),
  });

  if (!validatedFields.success) {
    const flatten = z.flattenError(validatedFields.error);
    return {
      success: false,
      message: 'Something went wrong!',
      error: flatten.formErrors[0],
      fieldErrors: flatten.fieldErrors,
    };
  }

  try {
    await prisma.project.create({
      data: {
        authorId: session.user.id,
        title: validatedFields.data.title,
        description: validatedFields.data.description,
        category: validatedFields.data.category,
        requiredParticipants: validatedFields.data.requiredParticipants,
      },
    });
    revalidatePath('/');
    return { success: true, message: 'Project created!' };
  } catch (err) {
    console.error(err);
    return { success: false, message: `Something went wrong! Try again later!` };
  }
}
