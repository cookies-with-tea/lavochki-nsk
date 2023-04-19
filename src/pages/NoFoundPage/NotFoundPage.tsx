import { BaseIcon } from '@/shared/ui'
import { Typography } from '@mui/material'

export const NotFoundPage = () => {
  return (
    <div className={'d-f ai-c jc-c fd-c ai-c h-100'}>
      <BaseIcon name={'404'} width={600} height={500} />
      <Typography variant={'h1'}>Упс... Страница не найдена :(</Typography>
    </div>
  )
}
