import { faker } from '@faker-js/faker';
import { createId } from '@paralleldrive/cuid2';

import {
  Prisma,
  PrismaClient,
  Project,
  ProjectCategory,
  ProjectStatus,
  ProjectType,
  User,
} from '@/generated/prisma/client';

export async function seedProjects(
  prisma: PrismaClient,
  users: User[],
  count: number
): Promise<Project[]> {
  console.log(`Generating ${count} projects...`);

  const projectsData: Prisma.ProjectCreateManyInput[] = Array.from({ length: count }).map(() => ({
    id: createId(),
    authorId: faker.helpers.arrayElement(users).id,
    title: faker.company.name(),
    description: faker.lorem.paragraphs(2),
    category: faker.helpers.arrayElement(Object.values(ProjectCategory)),
    type: [faker.helpers.arrayElement(Object.values(ProjectType))],
    status: faker.helpers.arrayElement(Object.values(ProjectStatus)),
    requiredParticipants: faker.number.int({ min: 1, max: 10 }),
  }));

  await prisma.project.createMany({ data: projectsData });

  console.log(`Successfully created ${projectsData.length} projects.`);

  return prisma.project.findMany();
}
