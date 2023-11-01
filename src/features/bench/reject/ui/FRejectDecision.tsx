import { Form } from 'antd'
import { useUnit } from 'effector-react'

import { rejectDecisionEvents, rejectDecisionSelectors } from 'features/bench/reject/model'

import { DecisionFormModelType } from 'shared/types'
import { SButton, SInput } from 'shared/ui'
import { IDialogProps, SDialog } from 'shared/ui/s-dialog/ui/SDialog'

export const FRejectDecision = (props: Omit<IDialogProps, 'children'>) => {
  const [isVisible, message] = useUnit([rejectDecisionSelectors.isDialogVisible, rejectDecisionSelectors.message])

  return (
    <SDialog
      open={isVisible}
      onSuccess={rejectDecisionEvents.dialogClosed}
      onCancel={rejectDecisionEvents.dialogClosed}
      {...props}
    >
      <div className="f-reject-decision">
        <Form>
          <Form.Item<DecisionFormModelType['message']>
            label={'Причина'}
            name={'reason'}
            rules={[{ required: true, message: 'Введите причину' }]}
          >
            <SInput
              name={'reason'}
              value={message}
              onChange={
                (event) => {
                  rejectDecisionEvents.messageChanged(event.target.value)
                }
              }
            />
          </Form.Item>

          <SButton
            htmlType={'submit'}
            onClick={
              () => rejectDecisionEvents.formSubmitted()
            }
          >
            Отклонить
          </SButton>
        </Form>
      </div>
    </SDialog>
  )
}
