-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "activity" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Snippet" ADD COLUMN     "activity" INTEGER NOT NULL DEFAULT 0;
