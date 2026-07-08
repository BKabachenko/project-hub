'use server';

import { revalidatePath } from 'next/cache';

import type { z } from 'zod';

import { auth } from '@/auth';
import type { ActionState } from '@/lib/constants';
import prisma from '@/lib/prisma';

import { formSchema } from './schema';
import type { FormParams } from './types';

const issuesToFieldErrors = (errors: z.core.$ZodIssue[]): Record<string, string[]> => {
  const result = errors.reduce<Record<string, string[]>>((acc, { path, message }) => {
    const fieldKey = path.join('.');
    acc[fieldKey] = [...(acc[fieldKey] || []), message];
    return acc;
  }, {});
  return result;
};

export async function createProjectAction(
  formData: FormParams
): Promise<ActionState<{ newProjectId: string }>> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: `Unauthorized or missing user data!` };
  }
  const userId = session.user.id;

  const { success, data, error } = formSchema.safeParse(formData);

  if (!success) {
    const fieldErrors = issuesToFieldErrors(error.issues);

    return {
      success: false,
      message: 'Invalid form data!',
      fieldErrors,
    };
  }

  try {
    const result = await prisma.project.create({
      data: {
        authorId: userId,
        title: data.title,
        description: data.description,
        category: data.category,
        type: data.type,
        gitUrl: data.gitUrl,
        requirements: {
          create: data.requirements.map((requirement) => ({
            role: requirement.role,
            requiredCount: requirement.requiredCount,
            // initially all positions are open
            openPositionsCount: requirement.requiredCount,
            techStack: requirement.techStack,
          })),
        },
        milestones: {
          create: data.milestones?.map((milestone) => ({
            title: milestone.title,
            description: milestone.description,
            status: milestone.status,
            order: milestone.order,
          })),
        },
      },
      select: {
        id: true,
      },
    });
    revalidatePath(`/projects`);
    return { success: true, message: 'Project created!', data: { newProjectId: result.id } };
  } catch (err) {
    console.error('[CREATE_PROJECT_ERROR]:', err);
    return { success: false, message: `Something went wrong! Try again later!` };
  }
}
