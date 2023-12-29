import express from 'express'
import { default as movieRoute } from './movie.route'
import { default as authRoute } from './auth.route'

const router = express.Router()
const defaultRoutes: any[] = [
  {
    path: '/movie',
    route: movieRoute
  },
  {
    path: '/auth',
    route: authRoute
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
