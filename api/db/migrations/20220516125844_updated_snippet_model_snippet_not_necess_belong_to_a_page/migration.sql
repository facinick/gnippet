-- DropForeignKey
ALTER TABLE "Snippet" DROP CONSTRAINT "Snippet_pageId_fkey";

-- AlterTable
ALTER TABLE "Snippet" ALTER COLUMN "pageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Snippet" ADD CONSTRAINT "Snippet_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
