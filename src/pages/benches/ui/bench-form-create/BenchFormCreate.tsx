import { Form, Space, Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { useState } from 'react'

import styles from 'pages/benches/ui/bench-form-create/styles.module.scss'

import { BenchType } from 'shared/types'
import { SButton, SInput, SInputNumber, SSelect } from 'shared/ui'
import { useUnit } from 'effector-react'
import { $lat, $lng, formSubmitted, latChanged, lngChanged, tagsChanged } from '../../model/create-bench'

type FieldType = {
  title?: string
  lat?: string
  lng?: string
  images?: string
  tags?: string[]
}

const cx = cnBind.bind(styles)

export const BenchFormCreate = () => {
  const [form, setForm] = useState<Partial<BenchType>>({
    images: [],
    is_active: false,
    lat: 0,
    lng: 0,
    tags: [],
  })

  const [images, setImages] = useState<Array<UploadFile>>([])

  const onValueChange = (value: number | string | null, formKey: string): void => {

    if (!value) return

    setForm({
      ...form,
      [formKey]: value
    })
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setImages(newFileList)
  }

  const [lat, lng] = useUnit([$lat, $lng])

  // TODO: Добавить тип
  const onFormSubmit = () => {
    formSubmitted()
  }

  return (
    <Form
      layout={'vertical'}
      autoComplete={'off'}
      className={cn(cx('bench-form-create'))}
      onFinish={onFormSubmit}
    >
      <Space className={'w-100'}>
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
              value={String(lat)}
              stringMode
              onChange={(value) => latChanged(String(value))}
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
              value={String(lng)}
              stringMode
              onChange={(value) => lngChanged(String(value))}
            />
          </Form.Item>
        </Space>

        <Form.Item<FieldType>
          label={'Теги'}
          name={'tags'}
          className={cn(cx('bench-form-create__tags'),)}
        >
          <SSelect
            onChange={(tagsIds) => tagsChanged(tagsIds)}
          />
        </Form.Item>
      </Space>

      <Form.Item<FieldType>
        label="Изображения"
        name="images"
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

      <Form.Item>
        <SButton appearance={'primary'} htmlType={'submit'} size={'sm'}>
          Создать
        </SButton>
      </Form.Item>
    </Form>
  )
}