import express from "express";
import { clinics } from '../public/prevencoes-castracao/clinicas/data/clinics.js';
import { submited_clinics } from './data/submited_clinics.js';


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

// Mostra o arquivo json contendo as clínicas submetidas por usuários

router.get('/clinicas-submetidas', (req, res) => {
    res.json(submited_clinics);
});

router.post('/clinicas-submetidas', (req, res) => {
    const submited_clinic = req.body;
  
    if (submited_clinic) {
      submited_clinics.push({ ...submited_clinic });
  
      res.json(submited_clinic);
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