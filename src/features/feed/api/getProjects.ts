import z from 'zod';

import type { resolvedParamsType } from '../types';

import { MemberRole, ProjectStatus, ProjectType } from '@/generated/prisma';
import prisma from '@/lib/prisma';

export const toArray = <T>(value: T | T[] | undefined): T[] => {
  if (!value) return [];
  return Array.isArray(value) ? [...value] : [value];
};

const urlParamToArray = <T extends z.ZodType>(schema: T) =>
  z
    .union([z.string(), z.array(z.string()), z.undefined()])
    .optional()
    .catch(undefined)
    .transform((val) => toArray(val) as z.input<T>[] | undefined)
    .pipe(z.array(schema).min(1).optional().catch(undefined));

export const filterParamsSchema = z.object({
  query: z.union([z.string(), z.undefined()]).optional().catch(undefined),
  role: urlParamToArray(z.enum(MemberRole)),
  category: urlParamToArray(z.enum(ProjectType)),
  status: urlParamToArray(z.enum(ProjectStatus)),
});

export type FilterParams = z.infer<typeof filterParamsSchema>;

export const getProjects = async (resolvedParams: resolvedParamsType) => {
  const safeParams = filterParamsSchema.safeParse(resolvedParams);
  console.log(safeParams)
  if (!safeParams.success) {
    return [];
  }

  const searchQuery = safeParams.data?.query;
  const role = safeParams.data?.role;
  const category = safeParams.data?.category;
  const status = safeParams.data?.status;

  const projects = await prisma.project.findMany({
    where: {
      OR: searchQuery
        ? [
            { title: { contains: searchQuery, mode: 'insensitive' } },
            { description: { contains: searchQuery, mode: 'insensitive' } },
          ]
        : undefined,
      requirements:
        role && role.length > 0
          ? { some: { role: { in: role }, openPositionsCount: { gt: 0 } } }
          : undefined,
      type: category && category.length > 0 ? { hasSome: category } : undefined,
      status: status && status.length > 0 ? { in: status } : undefined,
    },
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      requirements: true,
    },
  });

  return projects;
};
