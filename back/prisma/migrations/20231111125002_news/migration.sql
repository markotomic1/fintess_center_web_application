/*
  Warnings:

  - You are about to drop the column `day` on the `Training` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Training` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Training` table. All the data in the column will be lost.
  - Added the required column `trainingDay` to the `Training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainingName` to the `Training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainingTime` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Training" DROP COLUMN "day",
DROP COLUMN "name",
DROP COLUMN "time",
ADD COLUMN     "trainingDay" "DayOfWeek" NOT NULL,
ADD COLUMN     "trainingName" TEXT NOT NULL,
ADD COLUMN     "trainingTime" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "News" (
    "news_id" TEXT NOT NULL,
    "newsDescription" TEXT NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("news_id")
);
