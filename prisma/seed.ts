import { faker } from '@faker-js/faker';

import prisma from '@/lib/prisma';

import { cleanDb } from './seeders/cleanDb';
import { seedMembersAndRequirements } from './seeders/membersSeeder';
import { seedProjects } from './seeders/projectsSeeder';
import { seedReviews } from './seeders/reviewsSeeder';
import { seedUsers } from './seeders/usersSeeder';

// const prisma = new PrismaClient();

async function main() {
  console.time('Seeding execution time');
  console.log('Seeding process initialized...');

  await cleanDb(prisma);

  faker.seed(123);

  const users = await seedUsers(prisma, 20);
  const projects = await seedProjects(prisma, users, 15);

  await seedMembersAndRequirements(prisma, users, projects);
  await seedReviews(prisma, users, projects);

  console.log('Database seeding completed successfully.');
  console.timeEnd('Seeding execution time');
}

main()
  .catch((e) => {
    console.error('Seeding process failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
