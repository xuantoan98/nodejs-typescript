import express, { Request, Response } from 'express'
import router from './routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async function (req: Request, res: Response) {
  res.send('Welcome to application')
})

app.use('/v1', router)

export { app }
