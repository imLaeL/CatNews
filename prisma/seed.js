import { PrismaClient } from '@prisma/client';
import { submited_clinics, clinic_address } from './data.js';

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