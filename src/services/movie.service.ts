import { DB, envConfig } from '~/config/envConfig'
import { IMovie } from '../interfaces/movie.interface'
import { getOffset, formatResponse } from '../utils/helper'
import mysql, { ConnectionOptions } from 'mysql2/promise'
import { v4 as uuidv4 } from 'uuid'

const getMultiple = async (page = 1) => {
  const connection = await mysql.createConnection(DB as ConnectionOptions)
  const offset = getOffset(page, 10)
  const meta = { page }
  const queryStr = `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank FROM programming_languages LIMIT ${offset}, ${envConfig.listPerPage}`
  const [rows] = await connection.query(queryStr)
  connection.end()

  return formatResponse(200, false, 'GET MOVIES SUCCESSFULLY', { rows, meta })
}

const getMovieById = async (id: string, isCreated: boolean) => {
  const connection = await mysql.createConnection(DB as ConnectionOptions)
  const [rows] = await connection.query(`SELECT * FROM movie WHERE id='${id}'`)

  if (!rows) throw new Error('INTERNAL_SERVER_ERROR')
  if (isCreated) {
    return rows
  } else {
    return formatResponse(200, false, 'GET MOVIES SUCCESSFULLY', { rows })
  }
}

const create = async (movie: IMovie) => {
  if (!movie.title || !movie.authName) {
    throw new Error('TITLE AND AUTH_NAME IS REQUIRE')
  }
  const connection = await mysql.createConnection(DB as ConnectionOptions)
  const _id = uuidv4().toString()
  const queryStr = `INSERT INTO movie 
  (id, title, image_thumbnail, auth_name, publish_date) 
  VALUES 
  ('${_id}', '${movie.title}', '${movie.imageThumbnail}', '${movie.authName}', '${movie.publishDate}')`
  const [rows] = await connection.query(queryStr)
  if (!rows) throw new Error('INTERNAL_SERVER_ERROR')

  const data = await getMovieById(_id, true)
  if (!data) throw new Error('INTERNAL_SERVER_ERROR')

  connection.end()

  return formatResponse(200, false, 'CREATE_MOVIE_SUCCESSFULLY', data)
}

const update = async (id: string, data: IMovie) => {}

const remove = async (id: string) => {}

export { getMultiple, create, update, remove, getMovieById }
