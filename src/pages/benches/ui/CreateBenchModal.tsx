import { Modal } from '@mantine/core'
import { useUnit } from 'effector-react'

import { createBenchSelectors, createBenchEvents } from '#pages/benches/model/create-bench'

export const CreateBenchModal = () => {
  const closed = useUnit(createBenchEvents.dialogClosed)
  // states
  const [open] = useUnit([createBenchSelectors.isDialogOpen])

  return (
    <Modal opened={open} onClose={closed} centered title={'Добавление лавочки'}>
      <div>Инпут</div>
    </Modal>
  )
}
