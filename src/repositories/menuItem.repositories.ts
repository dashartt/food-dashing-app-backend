import MenuItemModel from '../database/models/menuItem.model'
import { IMenuItem, IMenuItemOutput } from '../types'

export const getMenuItemByName = async (name: string) => {
  const menuItem = await MenuItemModel.findOne({ name }).populate({
    path: 'categoryId',
  })

  return {
    _id: menuItem?._id,
    name: menuItem?.name,
    price: menuItem?.price,
    ...(menuItem?.ingredients && { ingredients: menuItem?.ingredients }),
    category: menuItem?.categoryId,
  } as unknown as IMenuItemOutput
}

export const getMenuItemByCategory = async (category_: string) => {
  const menuItemsByCategory = await MenuItemModel.aggregate([
    {
      $lookup: {
        from: 'itemcategories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $match: {
        'category.name': category_,
      },
    },
    {
      $project: {
        categoryId: 0,
        category: 0,
      },
    },
    {
      $addFields: {
        category: category_,
      },
    },
  ])

  return menuItemsByCategory
}

export const getMenuItems = async () => {
  const menuItems = await MenuItemModel.find({})
  return menuItems
}

export const addDefaultMenuItems = async () => {
  MenuItemModel.insertMany([
    // Drinks -------------------->
    {
      categoryId: '63c1a1a3882c8672ab49bac0',
      name: 'Coca Cola 2L',
      price: 12.0,
    },

    {
      categoryId: '63c1a1a3882c8672ab49bac0',
      name: 'Fanta 2L',
      price: 10.0,
    },
    {
      categoryId: '63c1a1a3882c8672ab49bac0',
      name: 'Guaraná 2L',
      price: 8.0,
    },
    {
      categoryId: '63c1a1a3882c8672ab49bac0',
      name: 'Sprite 2L',
      price: 10.0,
    },
    // Salty pizzas -------------------->
    {
      categoryId: '63c1a1a3882c8672ab49babd',
      name: 'Alho e Óleo',
      ingredients: 'mussarela, alho frito, azeite, tomate, orégano e azeitona',
      price: 32.99,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babd',
      name: 'Americana',
      ingredients: 'presunto, ovo, mussarela, calabresa, orégano e azeitona',
      price: 32.99,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babd',
      name: 'Bacon',
      ingredients: 'mussarela, bacon, tomate, orégano e azeitona',
      price: 32.99,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babd',
      name: 'Baiana',
      ingredients:
        'mussarela, calabresa, ovo, pimenta, cebola, orégano e azeitona',
      price: 32.99,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babd',
      name: 'Bauru',
      ingredients: 'presunto, mussarela, tomate, ovo, orégano e azeitona',
      price: 32.99,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babd',
      name: 'Brócolis',
      ingredients: 'mussarela, brócolis, bacon, alho, orégano e azeitona',
      price: 32.99,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babd',
      name: 'Calabresa',
      ingredients: 'mussarela, calabresa, cebola, orégano e azeitona',
      price: 32.99,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babd',
      name: 'Frango Catupiry',
      ingredients: 'mussarela, frango desfiado, catupiry, orégano e azeitona',
      price: 32.99,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babd',
      name: 'Marguerida',
      ingredients: 'mussarela, tomate, manjericão, orégano e azeitona',
      price: 32.99,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babd',
      name: 'Moda da Casa',
      ingredients:
        'mussarela, frango desfiado, calabresa, banco, catupiry, orégano e azeitona',
      price: 32.99,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babd',
      name: 'Portuguesa',
      ingredients:
        'mussarela, presunto, ervilha, palmito, ovo, milho, tomate, orégano e azeitona',
      price: 32.99,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babd',
      name: 'Strogonoff de carne',
      ingredients: 'mussarela, strogonoff de carne, orégano e azeitona',
      price: 32.99,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babd',
      name: 'Strogonoff de frango',
      ingredients: 'mussarela, strogonoff de frango, orégano e azeitona',
      price: 32.99,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babd',
      name: 'Vegetariana',
      ingredients:
        'mussarela, palmito, ervilha, milho, brocólis, orégano e azeitona',
      price: 32.99,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babd',
      name: '4 Queijos',
      ingredients:
        'mussarela, parmesão, provolone, catupiry, orégano e azeitona',
      price: 32.99,
    },
    // Sweet pizzas -------------------->
    {
      categoryId: '63c1a1a3882c8672ab49babe',
      name: 'Banana',
      ingredients: 'leite condensado, banana, açucar e canela',
      price: 32.99,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babe',
      name: 'Brigadeiro',
      ingredients: 'brigadeiro e confeitos',
      price: 32.99,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babe',
      name: 'Prestígio',
      ingredients: 'brigadeiro e coco ralado',
      price: 32.99,
    },
    // Arabic snack -------------------->
    {
      categoryId: '63c1a1a3882c8672ab49babf',
      name: 'Carne',
      ingredients:
        'pão sírio, alface, tomate, batata frita, molho de alho e carne',
      price: 23.0,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babf',
      name: 'Frango',
      ingredients:
        'pão sírio, alface, tomate, batata frita, molho de alho e frango',
      price: 23.0,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babf',
      name: 'Misto',
      ingredients:
        'pão sírio, alface, tomate, batata frita, molho de alho, carne e frango',
      price: 23.0,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babf',
      name: 'Vegetariano',
      ingredients:
        'pão sírio, alface, tomate, batata frita, molho de alho, milho e brócolis',
      price: 19.0,
    },
    {
      categoryId: '63c1a1a3882c8672ab49babf',
      name: 'Queijo e Bacon',
      ingredients:
        'pão sírio, alface, tomate, batata frita, molho de alho, queijo e bacon',
      price: 19.0,
    },
  ])
    .then(() =>
      console.log("\x1b[33m%s\x1b[0m', `=> 🚀 Default Menu Items inserted")
    )
    .catch(() =>
      console.warn("\x1b[33m%s\x1b[0m', `=> 🚀 Default Menu Items not inserted")
    )
}
