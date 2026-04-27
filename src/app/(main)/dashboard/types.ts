import type { Prisma } from '@/generated/prisma';

export type ProjectWithDetails = Prisma.ProjectGetPayload<{
  include: {
    projectPositions: true;
    projectMembers: {
      where: {
        status: {
          in: ['APPROVED', 'PENDING'];
        };
      };
      include: {
        user: {
          select: { id: true; name: true; updatedAt: true; image: true };
        };
      };
    };
  };
}>;

export type ProjectMemberWithUser = Prisma.ProjectMemberGetPayload<{
  include: {
    user: {
      select: { id: true; name: true; updatedAt: true; image: true };
    };
  };
}>;
