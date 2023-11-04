import { Form } from 'antd'
import { useUnit } from 'effector-react'

import { acceptDecisionEvents, acceptDecisionSelectors } from 'features/bench/accept/model'

import { DecisionFormModelType } from 'shared/types'
import { SButton, SInput, SDialog } from 'shared/ui'

export const FAcceptDecision = (props: CommonInterfaces.IDialogWithoutChildren) => {
  const [isVisible, message] = useUnit([acceptDecisionSelectors.isDialogVisible, acceptDecisionSelectors.message])

  return (
    <SDialog
      open={isVisible}
      onSuccess={acceptDecisionEvents.dialogClosed}
      onCancel={acceptDecisionEvents.dialogClosed}
      {...props}
    >
      <div className="f-reject-decision">
        <Form>
          <Form.Item<DecisionFormModelType['message']>
            label={'Пояснение'}
            name={'reason'}
            rules={[{ required: true, message: 'Введите пояснение' }]}
          >
            <SInput
              name={'reason'}
              value={message}
              onChange={
                (event) => {
                  acceptDecisionEvents.messageChanged(event.target.value)
                }
              }
            />
          </Form.Item>
          <Form.Item>
            <SButton
              htmlType={'submit'}
              onClick={
                () => acceptDecisionEvents.formSubmitted()
              }
            >
              Принять
            </SButton>
          </Form.Item>
        </Form>
      </div>
    </SDialog>
  )
}
