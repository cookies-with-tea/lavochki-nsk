import { Form, Space, Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'
import { useState } from 'react'

import { BenchType } from 'shared/types'
import { SButton, SInput, SInputNumber } from 'shared/ui'

type FieldType = {
  title?: string;
  lat?: string
  lng?: string
};

export const BenchFormCreate = () => {
  const [bench, setBench] = useState<BenchType>({
    address: '',
    id: '',
    images: [],
    is_active: false,
    lat: 0,
    lng: 0,
    owner: '',
    tags: []
  })

  const [images, setImages] = useState<Array<UploadFile>>([])

  const onValueChange = (value: number | string | null, formKey: string): void => {

    if (!value) return

    setBench({
      ...bench,
      [formKey]: value
    })
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setImages(newFileList)
  }

  return (
    <Form
      layout={'vertical'}
      autoComplete={'off'}
    >
      <Form.Item<FieldType>
        label="Название"
        name="title"
        rules={[{ required: false, message: 'Введите название лавочки!' }]}
      >
        <SInput placeholder={'Удобная лавочка...'} />
      </Form.Item>

      <Space>
        <Form.Item<FieldType>
          label="Долгота"
          name="lat"
          rules={[{ required: false, message: 'Введите название лавочки!' }]}
        >
          <SInputNumber
            name={'lat'}
            min={'-180'}
            max={'180'}
            value={bench.lat}
            stringMode
            onChange={(value) => onValueChange(value, 'lat')}
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="Широта"
          name="lng"
          rules={[{ required: false, message: 'Введите название лавочки!' }]}
        >
          <SInputNumber
            name={'lng'}
            min={'-180'}
            max={'180'}
            value={bench.lng}
            stringMode
            onChange={(value) => onValueChange(value, 'lng')}
          />
        </Form.Item>
      </Space>

      <Form.Item<FieldType>
        label="Название"
        name="title"
        rules={[{ required: false, message: 'Введите название лавочки!' }]}
      >
        {/* TODO: Добавить заместо текста "Картинка" какое-либо изображение */}
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
          fileList={images}
          onChange={handleChange}
        >
          Картинка
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <SButton appearance={'primary'} htmlType="submit">
          Создать лавочку
        </SButton>
      </Form.Item>
    </Form>
  )
}