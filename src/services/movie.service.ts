import { IMovie } from '../interfaces/movie.interface'
import { query } from '../utils/query'
import { getOffset, emptyOrRows } from '../utils/helper'
import { envConfig } from '../config/envConfig'

const getMultiple = async (page = 1) => {
  const offset = getOffset(page, 10)
  const queryStr = `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
  FROM programming_languages LIMIT ${offset},${envConfig.listPerPage}`
  const rows = await query(queryStr)
  console.log({rows})
  
  // const data = emptyOrRows(rows)
  const meta = { page }

  return {
    rows,
    meta
  }
}

const create = async (data: IMovie) => {

}

const update = async (id: string, data: IMovie) => {

}

const remove = async (id: string) => {

}

export { getMultiple, create, update, remove }
