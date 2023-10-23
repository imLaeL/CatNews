/*
  Warnings:

  - You are about to drop the column `numero` on the `Address` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "CEP" TEXT NOT NULL PRIMARY KEY,
    "rua" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "clinic_id" INTEGER NOT NULL,
    CONSTRAINT "Address_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "Clinic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("CEP", "cidade", "clinic_id", "rua") SELECT "CEP", "cidade", "clinic_id", "rua" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
