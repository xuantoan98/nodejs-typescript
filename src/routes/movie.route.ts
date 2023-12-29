import express from 'express'
import { movieController } from '../controllers'
import { authenticateToken } from '~/services/session.service'

const router = express.Router()

// GET Movies
router.get('/', movieController.getMovies)

// POST Movie
router.post('/', authenticateToken, movieController.createMovie)

// PUT Movie
router.put('/:id', movieController.updateMovie)

// Delete Movie
router.delete('/:id', movieController.deleteMovie)

export default router
