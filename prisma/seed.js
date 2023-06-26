import { PrismaClient } from '@prisma/client';
import { submited_clinics, clinic_address, medics, medics_clinics, users } from './data.js';

const prisma = new PrismaClient();


async function seed() {
    try {

        for (const clinic of submited_clinics) {
            await prisma.Clinic.create({
                data: clinic
            });
        }

        for (const address of clinic_address) {
            await prisma.Address.create({
                data: address
            });
        }

        for (const medic of medics) {
            await prisma.Medic.create({
                data: medic
            })
        }

        for (const medic_clinic of medics_clinics) {
            await  prisma.MedicOnClinic.create({
                data: medic_clinic
            })
        }

        for (const user of users) {
            await prisma.user.create({
                data: user
            })
        }

        console.log('\nSementes inseridas com sucesso')
    } catch (error) {
        console.error('\nErro ao inserir as sementes ;(', 'Erro:\n', error)
    }
};

seed()
    .then(async () => {
        await prisma.$disconnect()

    })

    .catch(async (e) => {

        console.error(e)

        await prisma.$disconnect()

        process.exit(1)

    });