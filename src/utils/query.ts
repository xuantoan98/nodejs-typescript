import { DB } from '../config/envConfig'
import mysql, { Connection } from 'mysql2'

export const query = async (sql: string, params?: any) => {
  const connection: Connection = mysql.createConnection(DB)

  const results = connection.query(sql, params)

  return results
}
