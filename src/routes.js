import express from "express";
import { clinics } from '../public/prevencoes-castracao/clinicas/data/clinics.js';
import SubmitedClinics from "./model/submited_clinics.js";

class HTTPError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

const router = express.Router();

router.get('/clinicas-joao-pessoa', (req, res) => {
    res.json(clinics);
});

// Mostra as clínicas submetidas por usuários no formato JSON

router.get('/clinicas-submetidas', async (req, res) => {
    const submited_clinics = await SubmitedClinics.readAll();
    
    res.json(submited_clinics);
});

// Adiciona novas clínicas
router.post('/clinicas-submetidas', async (req, res) => {
    const submited_clinic = req.body;

    const newclinic = await SubmitedClinics.create(submited_clinic);
  
    if (newclinic) {
      res.json(newclinic);
    } else {
      throw new HTTPError('Dados inválidos para adicionar a clínica ;( ', 400);
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