import { faker } from '@faker-js/faker';
import { createId } from '@paralleldrive/cuid2';

import { Prisma, PrismaClient, User, UserStatus } from '@/generated/prisma/client';

export async function seedUsers(prisma: PrismaClient, count: number): Promise<User[]> {
  console.log(`Generating ${count} users...`);

  const usersData: Prisma.UserCreateManyInput[] = Array.from({ length: count }).map(() => ({
    id: createId(),
    email: faker.helpers.uniqueArray(faker.internet.email, 1)[0],
    emailVerified: faker.datatype.boolean() ? faker.date.recent() : null,
    name: faker.person.fullName(),
    status: faker.helpers.arrayElement(Object.values(UserStatus)),
    image: faker.image.avatar(),
  }));

  await prisma.user.createMany({ data: usersData });

  console.log(`Successfully created ${usersData.length} users.`);

  return prisma.user.findMany();
}
