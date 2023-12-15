import { envConfig } from '../config/envConfig'
import mysql, { Connection } from 'mysql'

export const query = async (sql: string, params?: any) => {
  const config = {
    host: envConfig.host,
    user: envConfig.user,
    password: envConfig.password,
    database: envConfig.database,
    connectTimeout: envConfig.connectTimeout
  } as mysql.ConnectionOptions

  const connection: Connection = mysql.createConnection(config)

  const results = connection.query(sql, params)

  return results
}
