import { Schema, model } from 'mongoose'
import { IAdditional } from '../../types'

export const additionalSchema = new Schema<IAdditional>(
  {
    name: { type: String },
    price: { type: Number },
    categoryIds: [{ type: Schema.Types.ObjectId, ref: 'ItemCategory' }],
  },
  {
    timestamps: true,
  }
)

additionalSchema.path('id')

const AdditionalModel = model<IAdditional>('Additional', additionalSchema)

export default AdditionalModel
