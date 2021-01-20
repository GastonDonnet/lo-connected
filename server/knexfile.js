const knexStringcase = require('knex-stringcase');
const dotenv = require('dotenv');

dotenv.config();

const options = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DEV_DB_URL,
      user: process.env.DEV_DB_USER || 'root',
      password: process.env.DEV_DB_PASSWORD || undefined,
      database: process.env.DEV_DB_DATABASE,
      timezone: '-00:00',
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_URL,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      timezone: '-00:00',
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};

module.exports = {
  development: knexStringcase(options.development),
  production: knexStringcase(options.production),
};
