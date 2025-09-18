import pkg from "pg";
import dotenv from "dotenv";


import express from "express";      // Requisição do pacote do express
const app = express();              // Instancia o Express
const port = 3000;                  // Define a porta


dotenv.config();         // Carrega e processa o arquivo .env
const { Pool } = pkg;    // Utiliza a Classe Pool do Postgres


app.get("/", async (req, res) => {        // Cria endpoint na rota da raiz do projeto
  console.log("Rota GET / solicitada");
  dotenv.config();         // Carrega e processa o arquivo .env
const { Pool } = pkg;    // Utiliza a Classe Pool do Postgres


  res.json({
		message: "API para _____",      // Substitua pelo conteúdo da sua API
    author: "Gilzilene Orneles de Sales",    // Substitua pelo seu nome
    statusBD: dbStatus   // Acrescente esta linha

  });
});