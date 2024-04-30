import { Modal } from '@mantine/core'
import { useUnit } from 'effector-react'

import { editBenchSelectors, editBenchEvents } from './model/edit-bench'

export const EditBenchModal = () => {
  const closed = useUnit(editBenchEvents.modalClosed)

  // data
  const [detailBench] = useUnit([editBenchSelectors.detailBench])

  // states
  const [open] = useUnit([editBenchSelectors.isModalOpen])

  return (
    <Modal
      opened={open}
      onClose={closed}
      centered
      title={'Редактирование лавочки'}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      <div>
        <h2>Id: {detailBench?.id} </h2>
      </div>
    </Modal>
  )
}
