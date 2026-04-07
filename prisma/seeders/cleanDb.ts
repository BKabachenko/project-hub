import type { PrismaClient } from '@/generated/prisma/client';

export async function cleanDb(prisma: PrismaClient) {
  console.log('Cleaning database...');

  await prisma.$transaction([
    prisma.userReview.deleteMany(),
    prisma.projectReview.deleteMany(),
    prisma.projectMember.deleteMany(),
    prisma.projectRequirement.deleteMany(),
    prisma.session.deleteMany(),
    prisma.account.deleteMany(),
    prisma.verificationToken.deleteMany(),
    prisma.project.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log('Database cleaned.');
}
