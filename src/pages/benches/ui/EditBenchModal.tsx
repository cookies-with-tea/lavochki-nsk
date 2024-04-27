import { Modal } from '@mantine/core'
import { useUnit } from 'effector-react'

import { detailBenchSelectors, detailBenchEvents } from '#pages/benches/model/detail-bench'

export const EditBenchModal = () => {
  const closed = useUnit(detailBenchEvents.dialogClosed)

  // data
  const [detailBench] = useUnit([detailBenchSelectors.detailBench])

  // states
  const [open] = useUnit([detailBenchSelectors.isDialogOpen])

  return (
    <Modal opened={open} onClose={closed} centered title={'Редактирование лавочки'}>
      <div>
        <h2>Id: {detailBench?.id} </h2>
      </div>
    </Modal>
  )
}
