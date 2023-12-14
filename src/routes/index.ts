import express from 'express'
import { default as movieRoute } from './movie.route'

const router = express.Router()
const defaultRoutes: any[] = [
  {
    path: '/movie',
    route: movieRoute
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
