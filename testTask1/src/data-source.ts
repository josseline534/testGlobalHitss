import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { configEnv } from './config'
import { entities } from './entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configEnv.dbHost,
  port: configEnv.dbPort,
  username: configEnv.dbUser,
  password: configEnv.dbPassword,
  database: configEnv.dbName,
  synchronize: true,
  logging: false,
  entities,
  migrations: [],
  subscribers: []
})
