-- CreateTable
CREATE TABLE "Visitor" (
    "id" SERIAL NOT NULL,
    "fingerprintId" TEXT NOT NULL,
    "snippetId" INTEGER NOT NULL,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_fingerprintId_key" ON "Visitor"("fingerprintId");

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "Snippet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
