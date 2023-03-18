import { FC, ReactPortal, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import {
  StyledBackground,
  StyledClose,
  StyledContent,
  StyledImage,
  StyledImageWrapper,
  StyledTitle
} from '@/app/components/Common/ui/ImagePreview/ImagePreview.style'
import CommonIcon from '@/app/components/Common/ui/CommonIcon/CommonIcon'

const modalRootElement = document.body

interface IProps {
  open: boolean
  image?: string
  title: string
  onClose: () => void
}

const ImagePreview: FC<IProps> = ({ open, onClose, image, title }): ReactPortal | null => {
  const element = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    if (open) {
      modalRootElement?.appendChild(element)

      const close = (e: KeyboardEvent): void => {
        if (e.code === 'Escape' || e.code === 'Backspace') {
          onClose()
        }
      }

      document.addEventListener('keyup', close)

      return () => {
        modalRootElement?.removeChild(element)

        document.removeEventListener('keyup', close)
      }
    }
  })

  if (open) {
    return createPortal(
      <StyledBackground onClick={onClose}>
        <StyledContent onClick={(e) => e.stopPropagation()}>
          <StyledClose onClick={onClose}>
            <CommonIcon name={'close'} width={24} height={24} />
          </StyledClose>
          <StyledTitle>{ title }</StyledTitle>
          <StyledImageWrapper>
            <StyledImage src={image ?? ''} width={'100%'} height={'100%'} alt={''} layout="responsive" objectFit={'contain'} quality={100} />
          </StyledImageWrapper>
        </StyledContent>
      </StyledBackground>
      , element)
  }

  return null
}

export default ImagePreview