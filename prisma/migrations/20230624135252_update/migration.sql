/*
  Warnings:

  - You are about to drop the column `name` on the `Medic` table. All the data in the column will be lost.
  - Added the required column `name_medic` to the `Medic` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Medic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name_medic" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL
);
INSERT INTO "new_Medic" ("especialidade", "id") SELECT "especialidade", "id" FROM "Medic";
DROP TABLE "Medic";
ALTER TABLE "new_Medic" RENAME TO "Medic";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
