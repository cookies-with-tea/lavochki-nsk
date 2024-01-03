'use client'

import { useControlled } from '@/shared/lib/hooks'
import { forwardRef, MouseEvent, MouseEventHandler, ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'
import { DialogContent } from '@/components/shared/dialog/ui/DialogContent'
import { DialogHeader } from '@/components/shared/dialog/ui/DialogHeader'
import { CSSTransition } from 'react-transition-group'

import styles from './styles.module.scss'
import cb from 'classnames/bind'
import cn from 'classnames'

const cx = cb.bind(styles)

interface IDialogProps {
  container?: HTMLElement
  toBody?: boolean
  visible: boolean
  children: ReactNode
  center?: boolean

  onClose: () => void
}

// DEBT: Типизировать
const DialogInner = (props: IDialogProps, ref: any) => {
  const {
    children,
    center = false,
    visible: visibleProp = false,
    onClose,
  } = props

  // const [visible, setVisible] = useControlled({
  //   controlled: visibleProp,
  //   default: false,
  //   name: 'useDialog',
  //   state: 'false',
  // })

  // const [isVisible, setIsVisible] = useState(visibleProp)
  const handleVisibleChange = () => {
    // setVisible(false)

    onClose()
  }

  return (
    <>
      { visibleProp &&
        createPortal(
          <>
            <div className={'dialog'}>
              <div
                className={cx('dialog__overlay')}
                onClick={() => {
                  handleVisibleChange()
                }}
              >
                <DialogContent
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                >
                  <DialogHeader
                    onClick={() => {
                      handleVisibleChange()
                    }}
                  />

                  {children}
                </DialogContent>
              </div>
            </div>
          </>,
          document.body
        )
      }
    </>
  )
}

// DEBT: Типизировать
export const Dialog = forwardRef<any, IDialogProps>(DialogInner)
