import { envConfig } from '../config/envConfig'
import mysql from 'mysql2'

export const query = async (sql: string, params?: any) => {
  const config = {
    host: envConfig.host,
    user: envConfig.user,
    password: envConfig.password,
    database: envConfig.database,
    connectTimeout: envConfig.connectTimeout
  } as mysql.ConnectionOptions

  const connection = mysql.createConnection(config)

  const results = connection.execute(sql, params)

  return results
}