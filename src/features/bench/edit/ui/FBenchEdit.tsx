import { Form, Space, Upload } from 'antd'
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { useUnit } from 'effector-react'

import styles from 'features/bench/edit/ui/styles.module.scss'

import { events, selectors } from 'features/bench/edit/model/edit'

import { SButton, SInputNumber, SSelect } from 'shared/ui'

type FieldType = {
  title?: string
  lat?: string
  lng?: string
  images?: string
  tags?: string[]
}

const cx = cnBind.bind(styles)

// TODO: Добавить обнуление формы после закрытия редактирования формы.
// TODO: Добавить обновление таблицы после закрытия редактирования формы.
// TODO(возможно): Добавить сохранение черновика.
// TODO: Добавить возможность загрузки нескольких файлов
export const FBenchEdit = () => {
  const [
    images,
    options,
    formModel,
  ] = useUnit([
    selectors.images,
    selectors.tagsOptions,
    selectors.formModel,
    selectors.defaultImages,
  ])


  return (
    <Form
      layout={'vertical'}
      autoComplete={'off'}
      className={cn(cx('bench-form-edit'))}
      onFinish={events.formSubmitted}
      initialValues={{
        ['lat']: formModel?.lat,
        ['lng']: formModel?.lng,
      }}
    >
      <Space className={'w-100'}>
        <Space>
          <Form.Item<FieldType>
            label="Долгота"
            name="lat"
            valuePropName={'lat'}
            rules={[{ required: false, message: 'Введите долготу!' }]}
          >
            <SInputNumber
              name={'lat'}
              min={'-180'}
              max={'180'}
              value={formModel.lat}
              stringMode
              onChange={(value) => events.latChanged(String(value))}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Широта"
            name="lng"
            valuePropName={'lng'}
            rules={[{ required: false, message: 'Введите широту!' }]}
          >
            <SInputNumber
              name={'lng'}
              min={'-180'}
              max={'180'}
              value={formModel.lng}
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
