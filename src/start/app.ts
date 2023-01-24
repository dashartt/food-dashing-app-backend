import cors from 'cors'
import express, { Errback, NextFunction, Request, Response } from 'express'
import MenuItemModel from '../database/models/menuItem.model'
import routes from '../routes'

const app = express()

// Server Configs  ----------------------->
app.use(
  cors({
    origin: '*',
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)
// Routes ----------------------->

app.get('/', async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'server is alive' })
})

// Error Middleware  ----------------------->
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({ message: 'Internal Error' })
})

export default app
