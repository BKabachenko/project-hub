/*
  Warnings:

  - The primary key for the `ProjectMember` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ProjectMember" DROP CONSTRAINT "ProjectMember_pkey",
ADD CONSTRAINT "ProjectMember_pkey" PRIMARY KEY ("userId", "projectId", "role");
