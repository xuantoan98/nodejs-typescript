import { RowDataPacket } from 'mysql2'
export interface IMovie extends RowDataPacket {
  id: string
  title: string
  imageThumbnail: string
  authName: string
  publishDate: Date
}
