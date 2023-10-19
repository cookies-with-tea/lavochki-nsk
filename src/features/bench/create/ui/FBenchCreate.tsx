import { Form, Space, Upload } from 'antd'
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { useUnit } from 'effector-react'

import {
  createBenchEvents,
  createBenchSelectors
} from 'features/bench/create/model'
import styles from 'features/bench/create/ui/styles.module.scss'

import { SButton, SInputNumber, SSelect } from 'shared/ui'

type FieldType = {
  title?: string
  lat?: string
  lng?: string
  images?: string
  tags?: string[]
}

const cx = cnBind.bind(styles)

// TODO: Добавить обнуление формы после закрытия создания формы.
// TODO: Добавить обновление таблицы после закрытия создания формы.
// TODO(возможно): Добавить сохранение черновика.
export const FBenchCreate = () => {
  const [
    lat,
    lng,
    images,
    options
  ] = useUnit([
    createBenchSelectors.lat,
    createBenchSelectors.lng,
    createBenchSelectors.images,
    createBenchSelectors.tagsOptions
  ])

  return (
    <Form
      layout={'vertical'}
      autoComplete={'off'}
      className={cn(cx('bench-form-create'))}
      onFinish={createBenchEvents.formSubmitted}
    >
      <Space className={'w-100'}>
        <Space>
          <Form.Item<FieldType>
            label="Долгота"
            name="lat"
            rules={[{ required: false, message: 'Введите долготу!' }]}
          >
            <SInputNumber
              name={'lat'}
              min={'-180'}
              max={'180'}
              value={String(lat)}
              stringMode
              onChange={(value) => createBenchEvents.latChanged(String(value))}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Широта"
            name="lng"
            rules={[{ required: false, message: 'Введите широту!' }]}
          >
            <SInputNumber
              name={'lng'}
              min={'-180'}
              max={'180'}
              value={String(lng)}
              stringMode
              onChange={(value) => createBenchEvents.lngChanged(String(value))}
            />
          </Form.Item>
        </Space>

        <Form.Item<FieldType>
          label={'Теги'}
          name={'tags'}
          className={cn(cx('bench-form-create__tags'),)}
        >
          <SSelect
            options={options}
            onChange={(tagsIds) => createBenchEvents.tagsChanged(tagsIds)}
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
          customRequest={({ onSuccess }) => onSuccess && onSuccess('ok')} // Отмена action
          listType="picture-card"
          fileList={images}
          onChange={({ fileList }) => createBenchEvents.imagesChanged(fileList)}
        >
          Картинка
        </Upload>
      </Form.Item>

      <Form.Item>
        <SButton appearance={'primary'} htmlType={'submit'} size={'middle'}>
          Создать
        </SButton>
      </Form.Item>
    </Form>
  )
}
