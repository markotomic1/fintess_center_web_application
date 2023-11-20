/*
  Warnings:

  - A unique constraint covering the columns `[planId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `planId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeOfPlan" AS ENUM ('Basic_Plan', 'Premium_Plan', 'VIP_Plan', 'Group_Classes_Plan', 'No_Plan');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "planId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Plan" (
    "plan_id" TEXT NOT NULL,
    "name" "TypeOfPlan" NOT NULL DEFAULT 'No_Plan',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("plan_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_planId_key" ON "User"("planId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("plan_id") ON DELETE RESTRICT ON UPDATE CASCADE;
