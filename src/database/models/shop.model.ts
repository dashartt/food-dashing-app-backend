import { model } from 'mongoose'

import { IShopSettings } from '../../types/shop/settings.type'
import { shopSchema } from '../schemas'

const ShopModel = model<IShopSettings>('Shop', shopSchema)

export default ShopModel
