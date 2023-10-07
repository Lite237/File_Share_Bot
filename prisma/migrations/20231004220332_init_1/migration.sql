-- CreateEnum
CREATE TYPE "Type" AS ENUM ('SINGLE', 'GROUP');

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "files_id" TEXT[],
    "caption" TEXT NOT NULL,
    "type" "Type" NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrentProcess" (
    "id" TEXT NOT NULL,
    "files" TEXT[],

    CONSTRAINT "CurrentProcess_pkey" PRIMARY KEY ("id")
);
