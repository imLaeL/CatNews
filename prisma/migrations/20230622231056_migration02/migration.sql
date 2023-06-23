/*
  Warnings:

  - You are about to drop the column `title` on the `Address` table. All the data in the column will be lost.
  - Added the required column `cidade` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "CEP" TEXT NOT NULL PRIMARY KEY,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "clinic_id" INTEGER NOT NULL,
    CONSTRAINT "Address_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "Clinic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("CEP", "clinic_id") SELECT "CEP", "clinic_id" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
