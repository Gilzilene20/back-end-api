const { Pool } = pkg;
let pool = null;

import pkg from "pg";
import dotenv from "dotenv";


function conectarBD() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.URL_BD,
    });
  }
  return pool;
}


dotenv.config();         // Carrega e processa o arquivo .env
const { Pool } = pkg;    // Utiliza a Classe Pool do Postgres


app.get("/", async (req, res) => { // Cria endpoint na rota da raiz do projeto
  console.log("Rota GET / solicitada");

const db = new Pool({  
  connectionString: process.env.URL_BD,
});

let dbStatus = "ok";
try {
  await db.query("SELECT 1");
} catch (e) {
  dbStatus = e.message;
}

  res.json({
		message: "API para _____",      // Substitua pelo conteúdo da sua API
    author: "Gilzilene Orneles de Sales",    // Substitua pelo seu nome
    statusBD: dbStatus   // Acrescente esta linha
})
  });

  //server.js
app.get("/questoes", async (req, res) => {
	console.log("Rota GET /questoes solicitada"); // Log no terminal para indicar que a rota foi acessada
	
const db = new Pool({
  // Cria uma nova instância do Pool para gerenciar conexões com o banco de dados
  connectionString: process.env.URL_BD, // Usa a variável de ambiente do arquivo .env DATABASE_URL para a string de conexão
});

//server.js
try {
    const resultado = await db.query("SELECT * FROM questoes"); // Executa uma consulta SQL para selecionar todas as questões
    const dados = resultado.rows; // Obtém as linhas retornadas pela consulta
    res.json(dados); // Retorna o resultado da consulta como JSON
  } catch (e) {
    console.error("Erro ao buscar questões:", e); // Log do erro no servidor
    res.status(500).json({
      erro: "Erro interno do servidor",
      mensagem: "Não foi possível buscar as questões",
    });
  }
});

app.listen(port, () => {            // Um socket para "escutar" as requisições
  console.log(`Serviço rodando na porta:  ${port}`);
});