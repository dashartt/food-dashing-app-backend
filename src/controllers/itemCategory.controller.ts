import { NextFunction, Request, Response } from 'express'
import * as itemCategoryRepository from '../repositories/itemCategory.repositories'

export const addDefaultCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await itemCategoryRepository.addDefaultCategories()

  res.status(200).end()
}
