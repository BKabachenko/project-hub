import z from 'zod';

export const APPLY_FORM_SCHEMA_LIMITS = {
  COVER_LETTER_MIN: 100,
  COVER_LETTER_MAX: 2500,
};

const baseSchema = z.object({
  projectId: z.cuid(),
  requirementId: z.cuid(),
});

const coverLetter = z.string().trim().normalize();

export const applyFormSchema = z.discriminatedUnion('action', [
  baseSchema.extend({
    action: z.literal('apply'),
    coverLetter: coverLetter
      .min(APPLY_FORM_SCHEMA_LIMITS.COVER_LETTER_MIN)
      .max(APPLY_FORM_SCHEMA_LIMITS.COVER_LETTER_MAX),
  }),
  baseSchema.extend({
    action: z.literal('withdraw'),
    coverLetter: coverLetter.optional(),
  }),
]);
