/*
  Warnings:

  - You are about to drop the `Broker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `brokerId` on the `Clinic` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Broker_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Broker";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clinic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "horario_aberto" TEXT NOT NULL,
    "horario_fechado" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imageId" TEXT,
    CONSTRAINT "Clinic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Clinic_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Clinic" ("horario_aberto", "horario_fechado", "id", "imageId", "name", "userId") SELECT "horario_aberto", "horario_fechado", "id", "imageId", "name", "userId" FROM "Clinic";
DROP TABLE "Clinic";
ALTER TABLE "new_Clinic" RENAME TO "Clinic";
CREATE UNIQUE INDEX "Clinic_imageId_key" ON "Clinic"("imageId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
