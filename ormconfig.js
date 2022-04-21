require('dotenv/config')
module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  url: process.env.DB_URL_PRD,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE,
  logging: true,
  migrations: ['dist/infra/postgres/migrations/index.js'],
  entities: ['dist/infra/postgres/entities/index.js'],
  migrationsTableName: 'ztcc-migrations-table'
}
