# CatNews

[![HTML](https://img.shields.io/badge/Language-HTML-orange.svg)]()
[![JSON](https://img.shields.io/badge/Language-JSON-yellow.svg)]()
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow.svg)]()
[![TypeScript](https://img.shields.io/badge/Framework-TypeScript-blue.svg)]()
[![Express](https://img.shields.io/badge/Framework-Express-blue.svg)]()
[![Node.js](https://img.shields.io/badge/Runtime-Node.js-green.svg)]()
[![Bootstrap](https://img.shields.io/badge/UI-Bootstrap-purple.svg)]()
[![Next.js](https://img.shields.io/badge/Framework-Next.js-blue.svg)]()

CatNews é uma aplicação web construída com Node.js, Express e Next.js, que fornece notícias relacionadas a gatos, dicas de cuidados e uma plataforma para usuários contribuírem com informações de clínicas veterinárias locais. 🐱

## Índice

* [Descrição](#descrição)
* [Funcionalidades](#funcionalidades)
* [Tecnologias](#tecnologias)
* [Instalação](#instalação)
* [Uso](#uso)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Referência da API](#referência-da-api)
* [Contribuindo](#contribuindo)
* [Licença](#licença)
* [Links Importantes](#links-importantes)
* [Rodapé](#rodapé)

## Descrição

O CatNews tem como objetivo ser um recurso completo para tutores e entusiastas de gatos. Ele oferece artigos sobre cuidados, curiosidades e um diretório de clínicas veterinárias locais. Usuários podem se cadastrar, fazer login e enviar informações de clínicas para expandir o diretório. O backend, construído com Node.js e Express, fornece endpoints de API para autenticação de usuários, envio de clínicas e recuperação de dados. O frontend utiliza HTML, CSS, JavaScript e Bootstrap para criar uma interface amigável. 📰

## Funcionalidades

* **Autenticação de Usuários:** Cadastro e login seguros usando bcrypt e JWT. 🔑
* **Envio de Clínicas:** Usuários autenticados podem enviar informações de clínicas veterinárias, incluindo nome, endereço, horário e médico responsável. 🏥
* **Diretório de Clínicas:** Navegue por um diretório de clínicas veterinárias com detalhes como endereço, horários e contatos. 🐾
* **Gerenciamento de Perfil:** Usuários podem gerenciar informações do perfil e fazer upload de uma imagem. 👤
* **Conteúdo Informativo:** Acesse artigos sobre cuidados com gatos, prevenção e curiosidades. 📚

## Tecnologias

* **Backend:**

  * Node.js
  * Express
  * Prisma (ORM)
  * SQLite
  * bcrypt
  * jsonwebtoken
  * Nodemailer
  * Multer
  * Zod
* **Frontend:**

  * HTML
  * CSS
  * JavaScript
  * Bootstrap
  * Next.js (provavelmente usado em partes da UI, não como framework completo)

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/imLaeL/CatNews
   cd CatNews
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   * Crie um arquivo `.env` baseado no `.env-example`.
   * Configure as seguintes variáveis:

     * `EMAIL_HOST`
     * `EMAIL_PORT`
     * `EMAIL_SECURE`
     * `EMAIL_USER`
     * `EMAIL_PASS`
     * `JWT_SECRET`
     * `SALT_ROUNDS`

4. **Configure o banco de dados:**

   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

## Uso

1. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

   O servidor será iniciado em `http://localhost:3000`.

2. **Acesse a aplicação:**

   Abra o navegador e vá para `http://localhost:3000` para visualizar o site CatNews.

**Caso de Uso Real**

Imagine que você é um novo tutor de gato procurando dicas e recursos locais. O CatNews oferece orientações essenciais de cuidados, curiosidades divertidas e um diretório colaborativo de clínicas veterinárias próximas. Você também pode contribuir adicionando uma clínica que ainda não esteja listada, ajudando outros tutores da sua comunidade. 🏘️

## Estrutura do Projeto

```
CatNews/
├── public/
│   ├── cuidados/
│   ├── curiosidades/
│   ├── img/
│   ├── index.html
│   ├── login/
│   ├── prevencoes-castracao/
│   └── style.css
├── src/
│   ├── config/
│   ├── database/
│   ├── middleware/
│   ├── model/
│   ├── routes.js
│   ├── services/
│   └── index.js
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
├── .env
├── package.json
└── README.md
```

Diretórios e arquivos principais:

* `public/`: Contém os arquivos estáticos como HTML, CSS, JS e imagens.
* `src/`: Contém o código backend, incluindo:

  * `config/`: Arquivos de configuração (e.g., email, multer).
  * `database/`: Configuração do banco de dados.
  * `middleware/`: Funções de autenticação e validação.
  * `model/`: Modelos de dados.
  * `routes.js`: Define as rotas da API.
  * `services/`: Funções utilitárias (e.g., envio de email).
  * `index.js`: Ponto de entrada do backend.
* `prisma/`: Contém schema e migrações do Prisma.
* `package.json`: Dependências e scripts do projeto.

## Referência da API

O backend fornece os seguintes endpoints:

* `GET /clinicas-submetidas`: Lista clínicas enviadas (autenticação necessária).
* `POST /clinicas-submetidas`: Adiciona uma nova clínica (autenticação necessária).

  * Requer JSON com `clinic`, `address` e `medic`.
* `PUT /clinicas-submetidas/:id`: Atualiza uma clínica (autenticação necessária).
* `DELETE /clinicas-submetidas/:id`: Remove uma clínica (autenticação necessária).
* `GET /enderecos`: Lista endereços de clínicas.
* `GET /medicos`: Lista médicos.
* `POST /users`: Registra um novo usuário.

  * Requer JSON com `username`, `email`, `password`, `confirmationPassword`.
* `POST /signin`: Login de usuário existente.

  * Requer JSON com `email` e `password`.
* `GET /users/me`: Retorna o perfil do usuário autenticado.
* `POST /users/image`: Upload de imagem de perfil (autenticação necessária).
* `PUT /users/image`: Atualiza imagem de perfil (autenticação necessária).
* `POST /clinics/image`: Upload de imagem de clínica (autenticação necessária).

## Contribuindo

Contribuições são bem-vindas! 🎉 Para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção.
3. Realize as alterações e faça commits descritivos.
4. Envie para seu fork.
5. Abra um pull request.

## Licença

Este projeto está sob a Licença ISC. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## Links Importantes

* **Repositório:** [https://github.com/imLaeL/CatNews](https://github.com/imLaeL/CatNews)

## Rodapé

[![GitHub Repository](https://img.shields.io/github/repo/imLaeL/CatNews?style=social)](https://github.com/imLaeL/CatNews)

* **Repositório:** [CatNews](https://github.com/imLaeL/CatNews)
* **Autores:** Isaque Lael, Shannon Brunna, Kayck Jesse, Janaína Vitória 
* **Contato:** [Abra uma issue](https://github.com/imLaeL/CatNews/issues) para dúvidas e feedback. 💬

⭐️ Dê uma estrela e contribua para tornar o mundo dos amantes de gatos ainda melhor!

---

