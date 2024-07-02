const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mesaFacil',
  password: '30219815',
  port: 5432,
});

module.exports = pool;
