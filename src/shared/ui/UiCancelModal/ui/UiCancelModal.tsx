import { Grid, Modal } from '@mantine/core'
import { useUnit } from 'effector-react'

import { UiButton } from '#shared/ui'
import { cancelModalEvents, cancelModalSelectors } from '#shared/ui/UiCancelModal/model'

interface IUiCancelModalProps {
  title?: string
}

export const UiCancelModal = (props: IUiCancelModalProps) => {
  const { title = 'Подтверждение действия' } = props
  const { modalClosed, canceled, submitted } = cancelModalEvents
  const { isModalOpen } = cancelModalSelectors

  // events
  const [close, handleCancel, handleSubmit] = useUnit([modalClosed, canceled, submitted])

  // selectors
  const [opened] = useUnit([isModalOpen])

  return (
    <Modal opened={opened} onClose={close} title={title} centered>
      <div>
        <h3>Все ваши действия не будут сохранены</h3>

        <Grid className={'mt-12'}>
          <Grid.Col span={{ base: 6 }}>
            <UiButton fullWidth onClick={handleSubmit}>
              Подтвердить
            </UiButton>
          </Grid.Col>

          <Grid.Col span={{ base: 6 }}>
            <UiButton fullWidth color={'red'} onClick={handleCancel}>
              Отменить
            </UiButton>
          </Grid.Col>
        </Grid>
      </div>
    </Modal>
  )
}
