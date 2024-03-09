// pages/api/search.js

import pool from '../../backend/db.mjs';

export default async function handler(req, res) {
  const { query } = req.query;

  try {
    const { rows } = await pool.query(
      // Certifique-se de que as colunas na consulta correspondam às do banco de dados
      'SELECT id, titulo FROM procedure WHERE conteudo ILIKE $1',
      [`%${query}%`]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
}
