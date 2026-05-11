/*
  Warnings:

  - The values [PENDING,APPROVED,DECLINED] on the enum `ProjectMemberStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `requiredParticipants` on the `Project` table. All the data in the column will be lost.
  - The primary key for the `ProjectMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role` on the `ProjectMember` table. All the data in the column will be lost.
  - The primary key for the `ProjectRequirement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,requirementId]` on the table `ProjectMember` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `ProjectMember` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `requirementId` to the `ProjectMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProjectMember` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `ProjectRequirement` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'DECLINED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "MilestoneStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- AlterEnum
BEGIN;
CREATE TYPE "ProjectMemberStatus_new" AS ENUM ('ACTIVE', 'LEFT', 'REMOVED');
ALTER TABLE "ProjectMember" ALTER COLUMN "status" TYPE "ProjectMemberStatus_new" USING ("status"::text::"ProjectMemberStatus_new");
ALTER TYPE "ProjectMemberStatus" RENAME TO "ProjectMemberStatus_old";
ALTER TYPE "ProjectMemberStatus_new" RENAME TO "ProjectMemberStatus";
DROP TYPE "public"."ProjectMemberStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "requiredParticipants",
ADD COLUMN     "gitUrl" TEXT;

-- AlterTable
ALTER TABLE "ProjectMember" DROP CONSTRAINT "ProjectMember_pkey",
DROP COLUMN "role",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "requirementId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE',
ADD CONSTRAINT "ProjectMember_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProjectRequirement" DROP CONSTRAINT "ProjectRequirement_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "techStack" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "updatedAt" DROP DEFAULT,
ADD CONSTRAINT "ProjectRequirement_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "requirementId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "coverLetter" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Milestone" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "MilestoneStatus" NOT NULL DEFAULT 'PLANNED',
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Milestone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_userId_requirementId_key" ON "Application"("userId", "requirementId");

-- CreateIndex
CREATE UNIQUE INDEX "Milestone_projectId_order_key" ON "Milestone"("projectId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMember_userId_requirementId_key" ON "ProjectMember"("userId", "requirementId");

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "ProjectRequirement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "ProjectRequirement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
