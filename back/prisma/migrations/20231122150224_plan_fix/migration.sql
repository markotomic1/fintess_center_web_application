/*
  Warnings:

  - You are about to drop the column `endDate` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `planName` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_planId_fkey";

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "endDate",
DROP COLUMN "name",
DROP COLUMN "startDate",
ADD COLUMN     "planDescription" TEXT[],
ADD COLUMN     "planName" TEXT NOT NULL,
ADD COLUMN     "planPrice" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "endDateOfPlan" TIMESTAMP(3),
ADD COLUMN     "startDateOfPlan" TIMESTAMP(3),
ALTER COLUMN "planId" DROP NOT NULL;

-- DropEnum
DROP TYPE "TypeOfPlan";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("plan_id") ON DELETE SET NULL ON UPDATE CASCADE;
