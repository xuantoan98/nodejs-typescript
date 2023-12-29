import process from 'process'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

export const envConfig = {
  port: process.env.PORT,
  listPerPage: 10
}

export const DB = {
  host: '127.0.0.1',
  user: 'root',
  password: '1',
  database: 'db_node_api',
  connectTimeout: 60
}

export enum SessionTypesEnum {
  ACCESS = 'access',
  REFRESH = 'refresh',
  RESET_PASSWORD = 'resetPassword'
}

export type SessionTypes = SessionTypesEnum.ACCESS | SessionTypesEnum.REFRESH | SessionTypesEnum.RESET_PASSWORD
