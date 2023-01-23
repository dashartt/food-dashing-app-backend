import cors from 'cors'
import express, { Errback, NextFunction, Request, Response } from 'express'
import routes from '../routes'

const app = express()

// Server Configs  ----------------------->
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)
// Routes ----------------------->

// Error Middleware  ----------------------->
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({ message: 'Internal Error' })
})

export default app
