import { Modal } from 'antd'
import { ReactNode } from 'react'

interface IProps {
  title?: string
  open: boolean
  centered?: boolean
  children: ReactNode

  onSuccess: () => void
  onCancel: () => void
}

// TODO: Либо написать свой диалог, либо исправить поведение
// Проблема: Если указывать проп "transitionName={'fade'}" то диалог не будет закрываться полностью

// Варианты transitionName | START

// fade
// zoom
// zoom-big
// zoom-big-fast
// zoom-up
// zoom-down
// zoom-left
// zoom-right
// slide-up
// slide-down
// slide-left
// slide-right
// move-up
// move-down
// move-left
// move-right

// Варианты transitionName | END

export const SDialog = ({ title, open = false, children, centered = true, onCancel, onSuccess }: IProps) => {
  return (
    <Modal
      title={title}
      open={open}
      centered={centered}
      footer={null}
      onOk={onSuccess}
      onCancel={onCancel}
    >
      { children }
    </Modal>
  )
}
