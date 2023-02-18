import { ReactElement } from 'react'
import { StyledLoader, StyledRing, StyledText } from '@/app/components/Common/ui/CommonLoader/CommonLoader.style'

export const CommonLoader = (): ReactElement => (
  <StyledLoader>
    <StyledRing />
    <StyledText>Загрузка...</StyledText>
  </StyledLoader>
)
