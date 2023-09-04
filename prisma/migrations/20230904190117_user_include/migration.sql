/*
  Warnings:

  - Added the required column `userId` to the `Clinic` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clinic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageurl" TEXT NOT NULL,
    "horario_aberto" TEXT NOT NULL,
    "horario_fechado" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Clinic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Clinic" ("horario_aberto", "horario_fechado", "id", "imageurl", "name") SELECT "horario_aberto", "horario_fechado", "id", "imageurl", "name" FROM "Clinic";
DROP TABLE "Clinic";
ALTER TABLE "new_Clinic" RENAME TO "Clinic";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
