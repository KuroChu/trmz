// src/utils/config.ts
module.exports = {
  db: {
    user: process.env.DB_USER || 'user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'trmz',
    password: process.env.DB_PASSWORD || 'password',
    port: Number(process.env.DB_PORT) || 5432,
  },
};
