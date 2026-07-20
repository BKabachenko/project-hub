import type { Prisma } from '@/generated/prisma';

export type ProjectWithRequirementsAndMilestones = Prisma.ProjectGetPayload<{
  include: {
    authorUser: {
      select: {
        name: true;
        image: true;
      };
    };
    requirements: true;
    milestones: { orderBy: { order: 'asc' } };
    _count: {
      select: {
        projectMembers: { where: { status: 'ACTIVE' } };
      };
    };
  };
}>;

export type ProjectRequirementsPayload = ProjectWithRequirementsAndMilestones['requirements'];

export type ProjectMilestonesPayload = ProjectWithRequirementsAndMilestones['milestones'];

export type ProjectAuthorUserPayload = ProjectWithRequirementsAndMilestones['authorUser'];
