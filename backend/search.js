import pool from './db';

export default async function handler(req, res) {
  const { query } = req.query;

  try {
    const { rows } = await pool.query('SELECT * FROM procedure WHERE conteudo ILIKE $1', [`%${query}%`]);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados' });
  }
}
