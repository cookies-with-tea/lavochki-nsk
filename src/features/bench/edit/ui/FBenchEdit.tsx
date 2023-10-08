import { Form, Space, Upload } from 'antd'
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { useUnit } from 'effector-react'

import styles from 'features/bench/edit/ui/styles.module.scss'

import { events, selectors } from 'entities/bench/model/edit'

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
export const FBenchEdit = () => {
  const [
    lat,
    lng,
    images,
    options
  ] = useUnit([
    selectors.lat,
    selectors.lng,
    selectors.images,
    selectors.tagsOptions
  ])

  return (
    <Form
      layout={'vertical'}
      autoComplete={'off'}
      className={cn(cx('bench-form-edit'))}
      onFinish={events.formSubmitted}
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
              onChange={(value) => events.latChanged(String(value))}
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
              onChange={(value) => events.lngChanged(String(value))}
            />
          </Form.Item>
        </Space>

        <Form.Item<FieldType>
          label={'Теги'}
          name={'tags'}
          className={cn(cx('bench-form-edit__tags'),)}
        >
          <SSelect
            options={options}
            onChange={(tagsIds) => events.tagsChanged(tagsIds)}
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
          onChange={({ fileList }) => events.imagesChanged(fileList)}
        >
          Картинка
        </Upload>
      </Form.Item>

      <Form.Item>
        <SButton appearance={'primary'} htmlType={'submit'} size={'middle'}>
          Сохранить
        </SButton>
      </Form.Item>
    </Form>
  )
}
