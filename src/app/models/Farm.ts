export interface Farm {
  id: number
  name: string
  geometry: any
  area: number
  centroid: number[]
  creation_date?: Date
  owner_id: number
}
