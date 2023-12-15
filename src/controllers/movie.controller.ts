import { Request, Response } from 'express'
import { movieService } from '../services'
import { IMovie } from '../interfaces/movie.interface'
import { ApiError } from '../utils/helper'

const getMovies = async (req: Request, res: Response) => {
  try {
    const doc = await movieService.getMultiple()
    return res.json(doc)
  } catch (error: ErrorConstructor | any) {
    return res.json(ApiError(true, 500, error.message))
  }
}

const createMovie = async (req: Request, res: Response) => {
  try {
    const payload = req?.body as IMovie
    const doc = await movieService.create(payload)
    return res.json(doc)
  } catch (error: ErrorConstructor | any) {
    return res.json(ApiError(true, 500, error.message))
  }
}

const updateMovie = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const payload = req?.body as IMovie
    const doc = await movieService.update(id, payload)
    return doc
  } catch (error) {
    console.log(`Error while update movie `, error)
  }
}

const deleteMovie = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const doc = await movieService.remove(id)
    return doc
  } catch (error) {
    console.log(`Error while delete movie `, error)
  }
}

export { getMovies, createMovie, updateMovie, deleteMovie }
