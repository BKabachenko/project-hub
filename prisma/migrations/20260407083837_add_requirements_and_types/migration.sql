-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('PET_PROJECT', 'COMMERCIAL', 'OPEN_SOURCE', 'CHARITY');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "type" "ProjectType"[];

-- CreateTable
CREATE TABLE "ProjectRequirement" (
    "projectId" TEXT NOT NULL,
    "role" "MemberRole" NOT NULL,
    "requiredCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectRequirement_pkey" PRIMARY KEY ("projectId","role")
);

-- AddForeignKey
ALTER TABLE "ProjectRequirement" ADD CONSTRAINT "ProjectRequirement_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
