/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clinic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageurl" TEXT NOT NULL,
    "horario_aberto" TEXT NOT NULL,
    "horario_fechado" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Clinic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Clinic" ("horario_aberto", "horario_fechado", "id", "imageurl", "name", "userId") SELECT "horario_aberto", "horario_fechado", "id", "imageurl", "name", "userId" FROM "Clinic";
DROP TABLE "Clinic";
ALTER TABLE "new_Clinic" RENAME TO "Clinic";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id", "password", "username") SELECT "email", "id", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Image_name_key" ON "Image"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Image_userId_key" ON "Image"("userId");
