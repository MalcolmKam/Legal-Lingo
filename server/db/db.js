require('dotenv').config();
const { Client } = require('pg');

const connection = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect()
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Connection error', err));

module.exports = connection;
