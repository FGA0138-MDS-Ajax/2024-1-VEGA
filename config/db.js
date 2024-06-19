const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mesaFacil',
  password: 'xpedro03',
  port: 5432,
});

module.exports = pool;
