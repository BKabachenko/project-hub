import type { Prisma } from '@/generated/prisma';
export type ProjectWithPositions = Prisma.ProjectGetPayload<{
  include: {
    requirements: true;
  };
}>;