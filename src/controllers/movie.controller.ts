import express, { Request, Response } from 'express'
import { movieService } from '../services'
import { IMovie } from '../interfaces/movie.interface'

const getMovies = async (req: Request, res: Response) => {
  try {
    const doc = await movieService.getMultiple()
    return doc
  } catch (error) {
    console.log(`Error while getting movies `, error)
  }
}

const createMovie = async (req: Request, res: Response) => {
  try {
    const payload = req?.body as IMovie
    const doc = await movieService.create(payload)
    return doc
  } catch (error) {
    console.log(`Error while create movie `, error)
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
