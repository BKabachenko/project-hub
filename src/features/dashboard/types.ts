import type { MemberRole, Prisma } from '@/generated/prisma';


export type PendingApplicant = {
  id: string;
  userId: string;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  requirement: {
    id: string;
    role: MemberRole;
    projectId: string;
  };
};
export type OwnerProjectViewModel = {
  id: string;
  title: string;
  createdAt: Date;
  approvedApplicants: number;
  projectPositions: number;
  numberOfApplicants: number;
  pendingApplicants: PendingApplicant[];
}

export type MemberActiveProject = Prisma.ProjectGetPayload<{
  select: {
    id: true;
    title: true;
    status: true;
    category: true;
    type: true;
    projectMembers: {
      select: {
        userId: true;
        status: true;
        updatedAt: true;
        requirement: {
          select: {
            role: true;
            updatedAt: true;
          };
        };
      };
    };
  };
}>;
