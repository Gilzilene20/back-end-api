// ######
// Local onde os pacotes de dependências serão importados
// ######
import express from "express"; // Requisição do pacote do express
import pkg from "pg"; // Requisição do pacote do pg (PostgreSQL)
import dotenv from "dotenv"; // Importa o pacote dotenv para carregar variáveis de ambiente

// ######
// Local onde as configurações do servidor serão feitas
// ######
const app = express(); // Inicializa o servidor Express
const port = 3000; // Define a porta onde o servidor irá escutar
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// Variáveis e construtor para o Pool de Conexões
const { Pool } = pkg; // Obtém o construtor Pool do pacote pg
let pool = null; // Variável para armazenar o pool de conexões (uma única vez)

// ######
// Função para obter ou criar o pool de conexões com o banco de dados
// ######

/**
 * Retorna o pool de conexões com o banco de dados.
 * O pool é criado apenas na primeira chamada.
 */
function conectarBD() {
  // Se o pool ainda não foi criado, cria uma nova instância
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.URL_BD,
    });
  }
  // Retorna o pool (a mesma instância sempre)
  return pool;
}

// ######
// Local onde as rotas (endpoints) serão definidas
// ######

// Rota Raiz: Verifica o status do servidor e do BD
app.get("/", async (req, res) => {
  console.log("Rota GET / solicitada");

  // Reutiliza o Pool de conexões
  const db = conectarBD();

  let dbStatus = "ok";
  try {
    await db.query("SELECT 1");
  } catch (e) {
    dbStatus = e.message;
  }

  // Resposta com as informações do autor e status do BD
  res.json({
    message: "API para Gestão de Questões de Provas",
    author: "Gilzilene Orneles de Sales",
    dbStatus: dbStatus,
  });
});

// ---

// Rota para buscar todas as questões cadastradas
app.get("/questoes", async (req, res) => {
  console.log("Rota GET /questoes solicitada");

  // Reutiliza o Pool de conexões
  const db = conectarBD();

  try {
    const resultado = await db.query("SELECT * FROM questoes");
    const dados = resultado.rows;
    res.json(dados);
  } catch (e) {
    console.error("Erro ao buscar questões:", e);
    res.status(500).json({
      error: "Erro interno do servidor",
      mensagem: "Não foi possível buscar as questões",
    });
  }
});

// ######
// Local onde o servidor irá escutar as requisições
// ######
app.listen(port, () => {
  // Inicia o servidor na porta definida
  console.log(`Serviço rodando na porta: ${port}`);
});