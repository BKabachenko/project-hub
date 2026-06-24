import type { resolvedParamsType } from '../types';

import prisma from '@/lib/prisma';

import { filterParamsSchema } from '../schema';

export const getProjects = async (resolvedParams: resolvedParamsType) => {
  const safeParams = filterParamsSchema.safeParse(resolvedParams);
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
