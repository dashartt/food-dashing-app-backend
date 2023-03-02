export interface IAddress {
  _id?: string
  lat: number
  lon: number
  street: string
  housenumber: string
  suburb: string
  city: string
  state_code: string
  postcode: string
  country: string
  place_id: string
  complement?: string
  referencePoint?: string
}
