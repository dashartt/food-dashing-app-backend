import { NextFunction, Request, Response } from 'express'
import * as menuItemRepository from '../repositories/menuItem.repositories'

export const getMenuItemByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const name = req.params.name

  const menuItem = await menuItemRepository.getMenuItemByName(name)

  res.status(200).json(menuItem)
}

export const getMenuItemByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const category = req.params.category
  const menuItemsByCategory = await menuItemRepository.getMenuItemByCategory(
    category
  )

  res.status(200).json(menuItemsByCategory)
}

export const getMenuItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const menuItems = await menuItemRepository.getMenuItems()

  res.status(200).json(menuItems)
}

export const addDefaultMenuItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await menuItemRepository.addDefaultMenuItems()

  res.status(200).end()
}
