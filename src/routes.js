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

// Atualiza clínicas

router.put('/clinicas-submetidas/:id', async (req, res) => {
    const id = Number(req.params.id);

    const submited_clinic = req.body;

    if (id && submited_clinic) {
        const newclinic = await SubmitedClinics.update(submited_clinic, id);

        res.json(newclinic);
    } else {
        throw new HTTPError('Dados inválidos para atualizar clínica submetida', 400);
    }
});

// Deleta dados

router.delete('/clinicas-submetidas/:id', async (req, res) => {
    const id = Number(req.params.id);

    try {
        if (id && (await SubmitedClinics.remove(id))) {
            res.sendStatus(204);
        } else {
            throw new HTTPError('O id é necessário para remover a clínica submetida', 400);
        }
    
    } catch (error) {
        console.log('Ocorreu um erro ao deletar a clínica:', error);
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