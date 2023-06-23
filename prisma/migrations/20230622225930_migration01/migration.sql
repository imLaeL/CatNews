/*
  Warnings:

  - You are about to drop the column `content` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Address` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "CEP" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "clinic_id" INTEGER NOT NULL,
    CONSTRAINT "Address_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "Clinic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("CEP", "clinic_id", "title") SELECT "CEP", "clinic_id", "title" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
