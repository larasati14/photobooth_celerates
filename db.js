const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "photobooth_db",
  password: "laras",
  port: 5432,
});

module.exports = pool;