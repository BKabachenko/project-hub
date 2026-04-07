import { faker } from '@faker-js/faker';

import {
  MemberRole,
  Prisma,
  PrismaClient,
  Project,
  ProjectMemberStatus,
  User,
} from '@/generated/prisma/client';

export async function seedMembersAndRequirements(
  prisma: PrismaClient,
  users: User[],
  projects: Project[]
) {
  console.log('Generating members and requirements...');

  const membersData: Prisma.ProjectMemberCreateManyInput[] = [];
  const requirementsData: Prisma.ProjectRequirementCreateManyInput[] = [];

  for (const project of projects) {
    membersData.push({
      userId: project.authorId,
      projectId: project.id,
      role: MemberRole.OWNER,
      status: ProjectMemberStatus.APPROVED,
    });

    const rolesToRequire = faker.helpers.arrayElements(
      Object.values(MemberRole).filter((r) => r !== MemberRole.OWNER),
      { min: 1, max: 10 }
    );

    for (const role of rolesToRequire) {
      requirementsData.push({
        projectId: project.id,
        role: role,
        requiredCount: faker.number.int({ min: 1, max: 10 }),
      });
    }

    const potentialMembers = users.filter((u) => u.id !== project.authorId);
    const randomMembers = faker.helpers.arrayElements(potentialMembers, { min: 1, max: 2 });

    for (const member of randomMembers) {
      membersData.push({
        projectId: project.id,
        userId: member.id,
        role: faker.helpers.arrayElement(rolesToRequire),
        status: faker.helpers.arrayElement(Object.values(ProjectMemberStatus)),
      });
    }
  }

  await prisma.$transaction([
    prisma.projectRequirement.createMany({ data: requirementsData }),
    prisma.projectMember.createMany({ data: membersData }),
  ]);

  console.log(
    `Successfully created ${requirementsData.length} requirements and ${membersData.length} members.`
  );
}
