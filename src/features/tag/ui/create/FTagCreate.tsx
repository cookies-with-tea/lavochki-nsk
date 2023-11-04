import { Form, Input } from 'antd'
import { useUnit } from 'effector-react'

import { createBenchTagEvents, createBenchTagSelectors } from 'features/tag/model'

import { SButton, SDialog } from 'shared/ui'

export const FTagCreate = (props: CommonInterfaces.IDialogWithoutChildren) => {
  const [isVisible, title] = useUnit([createBenchTagSelectors.isDialogVisible, createBenchTagSelectors.title])

  return (
    <SDialog
      open={isVisible}
      onSuccess={createBenchTagEvents.dialogClosed}
      onCancel={createBenchTagEvents.dialogClosed}
      {...props}
    >
    <Form>
      <Form.Item>
        <Input
          name={'title'}
          placeholder={'Введите название'}
          value={title}
          onChange={(e) => createBenchTagEvents.titleChanged(e.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <SButton
          htmlType={'submit'}
          onClick={
            () => createBenchTagEvents.formSubmitted()
          }
        >
          Создать
        </SButton>
      </Form.Item>
    </Form>
  </SDialog>
  )
}
