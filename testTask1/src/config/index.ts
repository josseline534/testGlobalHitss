import { config } from 'dotenv'
config()

export const configEnv = {
  env: process.env.NODE_ENV,
  appHost: process.env.APP_HOST,
  appPort: process.env.APP_PORT,
  dbType: process.env.DB_TYPE ?? 'postgres',
  dbHost: process.env.DB_HOST,
  dbPort: Number(process.env.DB_PORT) ?? 5433,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  secretKey: process.env.SECRET_KEY
}
