import express from 'express';
import morgan from 'morgan';
import { clinics } from '../public/prevencoes-castracao/clinicas/data/clinics.js';
import { submited_clinics } from './data/submited_clinics.js'

class HTTPError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

const server = express();

server.use(morgan('tiny'));

server.use(express.json());

server.use(express.static('public'));

// Mostra o arquivo json contendo as clínicas de joão pessoa 

server.get('/clinicas-joao-pessoa', (req, res) => {
    res.json(clinics);
});

// Mostra o arquivo json contendo as clínicas submetidas por usuários

server.get('/clinicas-submetidas', (req, res) => {
    res.json(submited_clinics);
});

server.post('/clinicas-submetidas', (req, res) => {
    const submited_clinic = req.body;
  
    if (submited_clinic) {
      submited_clinics.push({ ...submited_clinic });
  
      res.json(submited_clinic);
    } else {
      throw new HTTPError('Dados inválidos para adicionar a clínica ;( ', 400);
    }
});

// Erro 404

server.use((req, res, next) => {
    res.status(404).json({ message: 'Conteúdo não foi achado ;(  ' });
});

// Manipulador de erros

server.use((err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof HTTPError) {
        res.status(err.code).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Something broke!' });
    }
});

server.listen(3000, () => {
    console.log('Servidor está rodando na porta 3000');
});