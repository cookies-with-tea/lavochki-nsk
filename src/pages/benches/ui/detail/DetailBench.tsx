import { Image, Space } from 'antd'
import { useUnit } from 'effector-react'

import { $detailBench } from '../../model/detail-bench'

export const DetailBench = () => {
  const bench = useUnit($detailBench)

  if (!bench) return null

  return (
    <div className={'detail-bench'}>
      <div className="detail-bench__item my-8">
        <b>Адрес:</b> {bench.street}
      </div>

      <div className="divider my-12" />

      <div className="detail-bench__item py-4">
        <b>Владелец:</b> *тут должна быть ссылка*
      </div>

      <div className="divider my-12" />

      <Space>
        <div className="detail-bench__item">
          <b>Широта:</b> {bench.lat}
        </div>
        <div className="detail-bench__item">
          <b>Долгота:</b> {bench.lng}
        </div>
      </Space>

      <Space>
        <Image.PreviewGroup items={bench.images}>
          {
            bench.images.map((src) => (
              <Image key={src} width={100}
src={src} />
            ))
          }
        </Image.PreviewGroup>
      </Space>
    </div>
  )
}
