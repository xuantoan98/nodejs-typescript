import { DB, envConfig } from '~/config/envConfig'
import { IMovie } from '../interfaces/movie.interface'
import { getOffset, formatResponse } from '../utils/helper'
import mysql, { ConnectionOptions } from 'mysql2/promise'
import { v4 as uuid4 } from 'uuid'

const getMultiple = async (page = 1) => {
  const connection = await mysql.createConnection(DB as ConnectionOptions)
  const offset = getOffset(page, 10)
  const meta = { page }
  const queryStr = `SELECT id, title, image_thumbnail, auth_name, publish_date FROM movie LIMIT ${offset}, ${envConfig.listPerPage}`
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
  const _id = uuid4().toString()
  const queryStr = `INSERT INTO movie 
  (id, title, image_thumbnail, auth_name, publish_date) 
  VALUES 
  ('${_id}', '${movie.title}', '${movie.imageThumbnail}', '${movie.authName}', '${movie.publishDate}')`
  const [rows] = await connection.query(queryStr)
  if (!rows) throw new Error('INTERNAL_SERVER_ERROR')

  const data = await getMovieById(_id, true)
  if (!data) throw new Error('INTERNAL_SERVER_ERROR')

  connection.end()

  return formatResponse(201, false, 'CREATE_MOVIE_SUCCESSFULLY', data)
}

const update = async (id: string, data: IMovie) => {
  const connection = await mysql.createConnection(DB as ConnectionOptions)
  const movie = await getMovieById(id, true)
  if(!movie) {
    throw new Error('MOVIE_NOT_FOUND')
  }

  const queryStrUpdate = `UPDATE movie SET title='${data.title}', image_thumbnail='${data.imageThumbnail}', auth_name='${data.authName}', publish_date='${data.publishDate}' WHERE id='${id}'`
  const [rows] = await connection.query(queryStrUpdate)
  if (!rows) throw new Error('INTERNAL_SERVER_ERROR')
  const result = await getMovieById(id, true)

  connection.end()
  return formatResponse(200, false, 'UPDATE_MOVIE_SUCCESSFULLY', result)
}

const remove = async (id: string) => {
  const connection = await mysql.createConnection(DB as ConnectionOptions)
  const movie = await getMovieById(id, true)
  if(!movie) {
    throw new Error('MOVIE_NOT_FOUND')
  }

  const queryDelete = `DELETE FROM movie WHERE id='${id}'`
  const [rows] = await connection.query(queryDelete)
  if (!rows) throw new Error('INTERNAL_SERVER_ERROR')

  connection.end()
  return formatResponse(200, false, 'DELETE_MOVIE_SUCCESSFULLY', {})
}

export { getMultiple, create, update, remove, getMovieById }
