import express from 'express'
import { movieController } from '../controllers'

const router = express.Router()

// GET Movies
router.get('/', movieController.getMovies)

// POST Movie
router.post('/', movieController.createMovie)

// PUT Movie
router.put('/:id', movieController.updateMovie)

// Delete Movie
router.delete('/:id', movieController.deleteMovie)

export default router
