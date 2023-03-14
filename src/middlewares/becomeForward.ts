import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

export default function becomeForward(
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('..')

  req.isForward = true
  return next()
}
