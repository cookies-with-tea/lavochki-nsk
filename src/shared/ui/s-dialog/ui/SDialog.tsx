import { Modal } from 'antd'
import { ReactNode, useRef } from 'react'
import { createPortal } from 'react-dom'

export interface IDialogProps {
  title?: string
  open?: boolean
  centered?: boolean
  children: ReactNode
  toBody?: boolean

  onSuccess?: () => void
  onCancel?: () => void
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

export const SDialog = ({
  title,
  open = false,
  children,
  centered = true,
  onCancel,
  onSuccess,
  toBody = false
}: IDialogProps) => {
  const teleportTarget = toBody ? document.body : document.getElementById('dialogs-container') ?? document.body
  const dialogWrapperRef = useRef<HTMLDivElement | null>(null)

  return (
    <>
      {
        createPortal(
          <div ref={dialogWrapperRef}>
            <Modal
              title={title}
              open={open}
              centered={centered}
              footer={null}
              getContainer={dialogWrapperRef.current ?? document.body}
              onOk={onSuccess}
              onCancel={onCancel}
            >
              { children }
            </Modal>
          </div>,
          teleportTarget
        )
      }
    </>
  )
}
