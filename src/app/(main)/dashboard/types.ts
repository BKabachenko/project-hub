import type { Prisma } from '@/generated/prisma';

export type ProjectWithDetails = Prisma.ProjectGetPayload<{
  select: {
    id: true;
    title: true;
    createdAt: true;
    authorId: true;
    requirements: {
      select: {
        requiredCount: true;
        applications: {
          include: {
            user: {
              select: { id: true; name: true; updatedAt: true; image: true };
            };
            requirement: {
              select: { role: true; projectId: true; id: true };
            };
          };
        };
      };
    };
    projectMembers: {
      select: {
        userId: true;
        projectId: true;
        status: true;
        requirement: {
          select: { role: true };
        };
      };
    };
  };
}>;

export type ProjectMemberWithUser = Prisma.ApplicationGetPayload<{
  include: {
    user: {
      select: { id: true; name: true; updatedAt: true; image: true };
    };
    requirement: {
      select: { role: true; projectId: true; id: true };
    };
  };
}>;
