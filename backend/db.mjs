import { createPool } from '@vercel/postgres';

// Substitua este valor pela sua string de conexão real
const connectionString = "postgres://default:srE4lQaZ1oGy@ep-calm-field-a4v1frtu-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require";

// Cria o pool de conexão com o PostgreSQL usando a string de conexão diretamente
const pool = createPool({
  connectionString
});

// Testa a conexão com o banco de dados
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida. Data e hora atuais do banco de dados:', res.rows[0].now);
  }
});

export default pool;
