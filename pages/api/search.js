// pages/api/search.js

import pool from '../../backend/db.mjs';

export default async function handler(req, res) {
  const { query } = req.query;
  console.log('Received query:', query); // Log para depuração

  try {
    await pool.query('SELECT set_limit(0.0);');
    console.log('Fuzzy search limit set.'); // Log para depuração

    // Usei a coluna 'conteudo' para busca fuzzy
    const result = await pool.query(
      'SELECT id, titulo, descricao FROM procedure WHERE conteudo ILIKE $1 ORDER BY similarity(conteudo, $1) DESC LIMIT 10;',
[`%${query}%`]
    );
    console.log('Query executed, rows:', result.rows); // Log para depuração

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
};
