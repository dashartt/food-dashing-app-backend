import ItemCategoryModel from '../database/models/itemCategory.model'

export const addDefaultCategories = async () => {
  ItemCategoryModel.insertMany([
    {
      name: 'salty pizza',
    },
    {
      name: 'sweet pizza',
    },
    {
      name: 'arabic snake',
    },
    {
      name: 'drinks',
    },
  ])
    .then(() =>
      console.log("\x1b[33m%s\x1b[0m', `=> 🚀 Default categories inserted")
    )
    .catch(() =>
      console.warn("\x1b[33m%s\x1b[0m', `=> 🚀 Default categories not inserted")
    )
}
