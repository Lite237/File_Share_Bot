-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "last_name" TEXT,
    "is_bot" BOOLEAN NOT NULL,
    "language_code" TEXT NOT NULL,
    "is_premium" BOOLEAN NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userId_key" ON "Users"("userId");
