import process from 'process'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

export const envConfig = {
  port: process.env.PORT,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectTimeout: process.env.CONNECTTIMEOUT,
  listPerPage: 10
}
