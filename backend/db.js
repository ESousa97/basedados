const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Asegure-se de que esta variável esteja definida no seu .env.local
});

module.exports = pool;
