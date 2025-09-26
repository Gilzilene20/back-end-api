// ######
// Importação dos pacotes de dependências
// ######
import express from "express";
import pkg from "pg";
import dotenv from "dotenv";

// ######
// Configurações iniciais do servidor
// ######
const app = express();
const port = 3000;

dotenv.config(); // Carrega as variáveis de ambiente do .env

const { Pool } = pkg; // Obtém o construtor Pool do pacote pg

let pool = null; // Variável para armazenar o pool de conexões

// Função para conectar com o banco de dados
function conectarBD() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.URL_BD,
    });
  }
  return pool;
}

// ######
// Rota raiz - Verifica status da API e conexão com o banco
// ######
app.get("/", async (req, res) => {
  console.log("Rota GET / solicitada");

  const db = conectarBD();

  let dbStatus = "ok";
  try {
    await db.query("SELECT 1");
  } catch (e) {
    dbStatus = e.message;
  }

  res.json({
    message: "API para gerenciamento de questões",
    author: "Gilzilene Orneles de Sales", // Substitua aqui pelo seu nome
    dbStatus: dbStatus,
  });
});

// ######
// Rota /questoes - Retorna todas as questões do banco
// ######
app.get("/questoes", async (req, res) => {
  console.log("Rota GET /questoes solicitada");

  const db = conectarBD();

  try {
    const resultado = await db.query("SELECT * FROM questoes");
    const dados = resultado.rows;
    res.json(dados);
  } catch (e) {
    console.error("Erro ao buscar questões:", e);
    res.status(500).json({
      erro: "Erro interno do servidor",
      mensagem: "Não foi possível buscar as questões",
    });
  }
});

// ######
// Inicialização do servidor
// ######
app.listen(port, () => {
  console.log(`Serviço rodando na porta: ${port}`);
});
