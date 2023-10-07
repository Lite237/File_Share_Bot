/*
  Warnings:

  - You are about to drop the column `files` on the `CurrentProcess` table. All the data in the column will be lost.
  - You are about to drop the column `caption` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `files_id` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CurrentProcess" DROP COLUMN "files";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "caption",
DROP COLUMN "files_id",
DROP COLUMN "type";

-- DropEnum
DROP TYPE "Type";

-- CreateTable
CREATE TABLE "FileInfo" (
    "id" TEXT NOT NULL,
    "tg_file_id" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "fileId" TEXT,
    "currentProcessId" TEXT,

    CONSTRAINT "FileInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FileInfo" ADD CONSTRAINT "FileInfo_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileInfo" ADD CONSTRAINT "FileInfo_currentProcessId_fkey" FOREIGN KEY ("currentProcessId") REFERENCES "CurrentProcess"("id") ON DELETE SET NULL ON UPDATE CASCADE;
