import { Form, Input } from 'antd'

import { SButton } from 'shared/ui'
import { formSubmitted, tagNameChanged } from '../../model/create-tag'

export const TagFormCreate = () => {
  return (
    <Form onFinish={formSubmitted}>
      <Form.Item>
        <Input onChange={(e) => tagNameChanged(e.target.value)} placeholder={'Введите название'} />
      </Form.Item>

      <Form.Item>
        <SButton htmlType={'submit'}>Создать</SButton>
      </Form.Item>
    </Form>
  )
}