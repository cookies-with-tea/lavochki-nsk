import { Drawer } from '@mantine/core'
import { useUnit } from 'effector-react'

import { detailBenchSelectors, detailBenchEvents } from './model/detail-bench'

export const DetailBenchDrawer = () => {
  const closed = useUnit(detailBenchEvents.drawerClosed)

  const [open] = useUnit([detailBenchSelectors.isDrawerOpen])
  const [detailBench] = useUnit([detailBenchSelectors.detailBench])

  return (
    <Drawer
      opened={open}
      onClose={closed}
      title="Authentication"
      position="right"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      <div>
        <h2>Id: {detailBench?.id} </h2>
      </div>
    </Drawer>
  )
}
