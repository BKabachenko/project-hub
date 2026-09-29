'use server';

import { revalidatePath } from 'next/cache';

import z from 'zod';

import { type ApplyFormParams } from '../types';

import { auth } from '@/auth';
import { ApplicationStatus } from '@/generated/prisma';
import type { ActionState } from '@/lib/constants';
import prisma from '@/lib/prisma';

import { applyFormSchema } from '../schemas';

async function applyToProjectAction(formData: ApplyFormParams): Promise<ActionState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: `Unauthorized or missing user data!` };
  }
  const userId = session.user.id;

  const { success, data, error } = applyFormSchema.safeParse(formData);

  if (!success) {
    return {
      success: false,
      message: 'Invalid form data!',
      fieldErrors: z.flattenError(error).fieldErrors,
    };
  }

  try {
    const result = await prisma.$transaction(
      async (tx) => {
        const requirement = await tx.projectRequirement.findUnique({
          where: {
            id: data.requirementId,
          },
        });

        if (!requirement) {
          throw new Error('Requirement does not exist.');
        }

        if (data.action === 'apply') {
          if (requirement.openPositionsCount <= 0) {
            throw new Error('Requirement does not have open positions.');
          }

          await tx.application.upsert({
            where: {
              userId_requirementId: {
                requirementId: data.requirementId,
                userId: userId,
              },
              status: { not: ApplicationStatus.APPROVED },
            },
            update: { status: ApplicationStatus.PENDING, coverLetter: data.coverLetter },
            create: {
              userId: userId,
              requirementId: data.requirementId,
              coverLetter: data.coverLetter,
            },
          });
          return { success: true, message: 'Application submitted successfully!' };
        }

        if (data.action === 'withdraw') {
          const withdrawResult = await tx.application.update({
            where: {
              userId_requirementId: {
                requirementId: data.requirementId,
                userId: userId,
              },
              status: ApplicationStatus.PENDING,
            },
            data: { status: ApplicationStatus.WITHDRAWN },
          });

          if (!withdrawResult) {
            throw new Error('Application does not exist.');
          }

          return { success: true, message: 'Application withdrawn successfully!' };
        }

        throw new Error('Unexpected action.');
      },
      { isolationLevel: 'RepeatableRead' }
    );

    revalidatePath('/dashboard');
    revalidatePath(`/projects/${data.projectId}`);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Something went wrong! Please try again later.' };
  }
}

export default applyToProjectAction;
