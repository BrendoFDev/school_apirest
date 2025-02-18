/* eslint-disable no-undef */
require('dotenv').config();

module.exports = {
  dialect:'mariadb',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    unedrscoredAll: true,
    'createdAt': 'created_at',
    'updatedAt': 'update_at'
  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo'
  },
  timezone: 'America/Sao_Paulo'
}
