import { faker } from '@faker-js/faker';

import prisma from '@/lib/prisma';

import { seedApplications } from './seeders/applicationSeeder';
import { cleanDb } from './seeders/cleanDb';
import { seedProjectMembers } from './seeders/projectMemberSeeder';
import { seedProjectRequirements } from './seeders/projectRequirementSeeder';
import { seedProjects } from './seeders/projectsSeeder';
import { seedUsers } from './seeders/usersSeeder';

async function main() {
  console.time('Seeding execution time');
  console.log('Seeding process initialized...');

  await cleanDb(prisma);

  await seedUsers(prisma);
  await seedProjects(prisma);
  await seedProjectRequirements(prisma);
  await seedApplications(prisma);
  await seedProjectMembers(prisma);

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
