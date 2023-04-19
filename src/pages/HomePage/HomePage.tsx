import { Typography } from '@mui/material'
import { BaseNoData } from '@/components/ui'

export const HomePage = () => {
  return (
    <div>
      <Typography variant={'h1'}>Статистика</Typography>

      <BaseNoData title={'Здесь должны быть графики'} />
    </div>
  )
}
