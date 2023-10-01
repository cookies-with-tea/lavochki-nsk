import { UploadFile } from 'antd'

export type CreateBenchPayloadType = {
  lat: string
  lng: string
  tags?: Array<string>
  images: Array<UploadFile>
}
