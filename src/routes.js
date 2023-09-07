import { Router } from 'express';
import { clinics } from '../public/prevencoes-castracao/clinicas/data/clinics.js';
import prisma from './database/database.js';
import SubmitedClinics from './model/submited_clinics.js';
import Address from './model/address.js';
import Medic from './model/medics.js';
import Medic_Clinic from './model/medic_on_clinic.js';
import Users from './model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { isAuthenticated } from './middleware/auth.js';

const saltRounds = Number(process.env.SALT_ROUNDS)

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const router = Router();

router.get('/clinicas-joao-pessoa', (req, res) => {
  res.json(clinics);
});

// Mostra as clínicas submetidas por usuários no formato JSON

router.get('/clinicas-submetidas', isAuthenticated, async (req, res) => {
  const submited_clinics = await SubmitedClinics.readAll();

  res.json(submited_clinics);
});

// Adiciona novas clínicas
router.post('/clinicas-submetidas', isAuthenticated, async (req, res) => {
  const { clinic, address, medic } = req.body;

  clinic.userId = req.userId;

  try {
    //Crio clínica
    const newClinic = await SubmitedClinics.create(clinic);

    console.log('\n\n', newClinic, '\n\n');

    //Crio médico
    const newMedic = await Medic.create(medic);

    //Pego id da clínica criada
    const id_clinic = newClinic.id;

    //Pego o id do médico criado
    const id_medic = newMedic.id;

    //Endereço é igual os dados da requisição com o id da clínica.
    const addressClinic = { ...address, clinic_id: id_clinic };

    //Crio endereço
    await Address.create(addressClinic);

    //Crio tabela do relacionamento médico e clínica
    await Medic_Clinic.create(id_medic, id_clinic);

    if (newClinic) {
      res.json({ clinic: newClinic, address: addressClinic, medic: newMedic });
    } else {
      throw new HTTPError('Dados inválidos para adicionar a clínica ;( ', 400);
    }
  } catch (err) {
    console.log(err);
  }


});

// Atualiza clínicas

router.put('/clinicas-submetidas/:id', isAuthenticated, async (req, res) => {
  const id = Number(req.params.id);

  const submited_clinic = req.body;

  if (id && submited_clinic) {
    const newclinic = await SubmitedClinics.update(submited_clinic, id);

    res.json(newclinic);
  } else {
    throw new HTTPError(
      'Dados inválidos para atualizar clínica submetida',
      400
    );
  }
});

// Deleta dados

router.delete('/clinicas-submetidas/:id', isAuthenticated, async (req, res) => {
  const id = Number(req.params.id);

  try {

    /* const teste = await Medic_Clinic.remove(id);
   console.log('\n\n', teste, '\n\n')
    const removedClinic = await SubmitedClinics.remove(id);
    console.log('\n\n',removedClinic, '\n\n') */

    async function remove(id) {
      // Deleta os dados da tabela pelo id da clínica

      await prisma.medicOnClinic.deleteMany({
        where: {
          clinic_id: id,
        },
      });

      await prisma.address.deleteMany({
        where: {
          clinic_id: id,
        },
      });

      const removedClinic = await prisma.clinic.delete({
        where: {
          id: id,
        },
      });

      return removedClinic;
    }

    const removedClinic = await remove(id);

  if (id && removedClinic) {
    res.sendStatus(204);
  } else {
    throw new HTTPError(
      'O id é necessário para remover a clínica submetida',
      400
    );
  }
} catch (error) {
  console.log('Ocorreu um erro ao deletar a clínica:', error);
}
});

// Mostra todos os endereços submetidos

router.get('/enderecos', async (req, res) => {
  const clinic_addresses = await Address.readAll();

  res.json(clinic_addresses);
});

// Mostra todos os médicos
router.get('/medicos', async (req, res) => {
  const medics = await Medic.readAll();

  res.json(medics);
})

// Mostra médicos que trabalham nas clínicas
router.get('/medicos_clinicas', async (req, res) => {
  const medics_clinics = await Medic_Clinic.readAll();

  res.json(medics_clinics);
})

//Mostra usuários cadastrados
router.get('/users', async (req, res) => {
  const users = await Users.readAll();

  res.json(users);
})

//Cadastro do usuário
router.post('/users', async (req, res) => {
  const user = req.body;

  delete user.confirmationPassword;

  const hash = await bcrypt.hash(user.password, saltRounds);

  user.password = hash;

  const newUser = await Users.create(user);

  res.status(201).json(newUser);
});

//Login de usuário
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.readByEmail(email);

    const { id: userId, password: hash } = user;

    const match = await bcrypt.compare(password, hash);

    if (match) {
      const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: 3600 } // 1h
      );

      res.json({ auth: true, token });
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(401).json({ error: 'User not found' });
  }
});

// Erro 404

router.use((req, res, next) => {
  res.status(404).json({ message: 'Conteúdo não foi achado ;(  ' });
});

// Manipulador de erros

router.use((err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof HTTPError) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Something broke!' });
  }
});

export default router;
