import { faker } from '@faker-js/faker';

import { Prisma, PrismaClient, Project, User } from '@/generated/prisma/client';

export async function seedReviews(prisma: PrismaClient, users: User[], projects: Project[]) {
  console.log('Generating reviews...');

  const projectReviewsData: Prisma.ProjectReviewCreateManyInput[] = [];
  const userReviewsData: Prisma.UserReviewCreateManyInput[] = [];

  for (const project of projects) {
    const potentialProjectReviewers = users.filter((u) => u.id !== project.authorId);

    if (potentialProjectReviewers.length > 0) {
      const projectReviewer = faker.helpers.arrayElement(potentialProjectReviewers);

      projectReviewsData.push({
        authorId: projectReviewer.id,
        projectId: project.id,
        review: faker.lorem.sentences(2),
        rating: faker.number.int({ min: 1, max: 5 }),
      });
    }

    const potentialUserReviewTargets = users.filter((u) => u.id !== project.authorId);

    if (potentialUserReviewTargets.length > 0) {
      const userReviewTarget = faker.helpers.arrayElement(potentialUserReviewTargets);

      userReviewsData.push({
        authorId: project.authorId,
        targetId: userReviewTarget.id,
        projectId: project.id,
        review: faker.lorem.sentence(),
        rating: faker.number.int({ min: 1, max: 5 }),
      });
    }
  }

  await prisma.$transaction([
    prisma.projectReview.createMany({ data: projectReviewsData }),
    prisma.userReview.createMany({ data: userReviewsData }),
  ]);

  console.log(
    `Successfully created ${projectReviewsData.length} project reviews and ${userReviewsData.length} user reviews.`
  );
}
