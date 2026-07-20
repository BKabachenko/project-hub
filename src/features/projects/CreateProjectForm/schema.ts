import z from 'zod';

import { MemberRole, MilestoneStatus, ProjectCategory, ProjectType } from '@/generated/prisma';

export const CREATION_PROJECT_SCHEMA_LIMITS = {
  TITLE_MIN: 5,
  TITLE_MAX: 100,
  DESCRIPTION_MIN: 30,
  DESCRIPTION_MAX: 1500,
  TYPE_MIN: 1,
  GITURL_MAX: 350,
  MILESTONES_MAX: 20,
  MILESTONES_TITLE_MIN: 5,
  MILESTONES_TITLE_MAX: 100,
  MILESTONES_DESCRIPTION_MIN: 30,
  MILESTONES_DESCRIPTION_MAX: 1500,
  REQUIREMENTS_MIN: 1,
  REQUIREMENTS_MAX: 50,
  REQUIREMENTS_REQUIRE_COUNT_MAX: 100,
  REQUIREMENTS_TECHSTACK_MIN: 1,
};

export const formSchema = z.object({
  title: z
    .string()
    .min(CREATION_PROJECT_SCHEMA_LIMITS.TITLE_MIN)
    .max(CREATION_PROJECT_SCHEMA_LIMITS.TITLE_MAX),
  description: z
    .string()
    .min(CREATION_PROJECT_SCHEMA_LIMITS.DESCRIPTION_MIN)
    .max(CREATION_PROJECT_SCHEMA_LIMITS.DESCRIPTION_MAX),
  category: z.enum(ProjectCategory),
  type: z.array(z.enum(ProjectType)).min(CREATION_PROJECT_SCHEMA_LIMITS.TYPE_MIN),
  gitUrl: z
    .url({ protocol: /^https?$/ })
    .max(CREATION_PROJECT_SCHEMA_LIMITS.GITURL_MAX)
    .optional(),
  milestones: z
    .array(
      z.object({
        title: z
          .string()
          .min(CREATION_PROJECT_SCHEMA_LIMITS.MILESTONES_TITLE_MIN)
          .max(CREATION_PROJECT_SCHEMA_LIMITS.MILESTONES_TITLE_MAX),
        description: z
          .string()
          .min(CREATION_PROJECT_SCHEMA_LIMITS.MILESTONES_DESCRIPTION_MIN)
          .max(CREATION_PROJECT_SCHEMA_LIMITS.MILESTONES_DESCRIPTION_MAX)
          .optional(),
        status: z.enum(MilestoneStatus),
        order: z.number(),
      })
    )
    .max(CREATION_PROJECT_SCHEMA_LIMITS.MILESTONES_MAX)
    .optional(),
  requirements: z
    .array(
      z.object({
        role: z.enum(MemberRole),
        requiredCount: z
          .number()
          .positive()
          .max(CREATION_PROJECT_SCHEMA_LIMITS.REQUIREMENTS_REQUIRE_COUNT_MAX),
        techStack: z
          .array(z.string())
          .transform((items) => Array.from(new Set(items)))
          .pipe(
            z.array(z.string())
            .min(CREATION_PROJECT_SCHEMA_LIMITS.REQUIREMENTS_TECHSTACK_MIN)
          ),
      })
    )
    .min(CREATION_PROJECT_SCHEMA_LIMITS.REQUIREMENTS_MIN)
    .max(CREATION_PROJECT_SCHEMA_LIMITS.REQUIREMENTS_MAX),
});
