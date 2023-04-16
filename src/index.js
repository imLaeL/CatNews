import express from 'express';
import morgan from 'morgan';
import { clinicas } from './data/clinics.js';
import path from 'path';

class HTTPError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

const server = express();

server.use(morgan('tiny'));

server.use(express.json());

server.use(express.static('/public'));

// Mostra a página inicial

server.get('/', (req, res) => {
    res.sendFile('../public/index.html'), { root: __dirname};
});

// Mostra o arquivo json contendo as clínicas de joão pessoa 

server.get('/clinicas-joao-pessoa', (req, res) => {
    res.json(clinicas);
});

// 404 handler

server.use((req, res, next) => {
    res.status(404).json({ message: 'Content not found!' });
});

// Error handler


//server.use((err, req, res, next) => {
    // console.error(err.stack);

  //  if (err instanceof HTTPError) {
    //    res.status(err.code).json({ message: err.message });
  //  } else {
    //    res.status(500).json({ message: 'Something broke!' });
    //}
//});

server.listen(3000, () => {
    console.log('Servidor está rodando na porta 3000');
});
