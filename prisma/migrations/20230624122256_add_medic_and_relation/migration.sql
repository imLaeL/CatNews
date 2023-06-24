-- CreateTable
CREATE TABLE "Medic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MedicOnClinic" (
    "medic_id" INTEGER NOT NULL,
    "clinic_id" INTEGER NOT NULL,

    PRIMARY KEY ("medic_id", "clinic_id"),
    CONSTRAINT "MedicOnClinic_medic_id_fkey" FOREIGN KEY ("medic_id") REFERENCES "Medic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MedicOnClinic_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "Clinic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
