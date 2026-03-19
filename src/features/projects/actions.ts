'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import prisma from '@/lib/prisma';

export type ActionState = {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  category: z.enum(['E_COMMERCE', 'EDUCATION', 'HEALTHCARE', 'FINANCE']),
  requiredParticipants: z.coerce.number().min(1),
});

export async function createProjectAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const validatedFields = schema.safeParse({
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

  // REPLACE: authorId to real userID
  try {
    await prisma.project.create({
      data: {
        authorId: '1',
        title: validatedFields.data.title,
        description: validatedFields.data.description,
        category: validatedFields.data.category,
        requiredParticipants: validatedFields.data.requiredParticipants,
      },
    });
    revalidatePath('/');
    return { success: true, message: 'Project created!' };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err)
      return { success: false, message: `Something went wrong! Try again later!` };
    } else {
      console.error(err)
      return { success: false, message: `Something went wrong! Try again later!` };
    }
  }
}
