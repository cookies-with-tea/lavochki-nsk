import { Typography } from '@mui/material'
import { BenchesTable } from '@/components/pages/Benches/BenchesTable/BenchesTable'

export const BenchesPage = () => {
  return (
    <div>
      <div className={'d-f ai-c jc-sb'}>
        <Typography variant={'h2'}>Лавочки</Typography>

        <div className={'d-f ai-c'}>
          <div>
            фильтр
          </div>
          <div>
            Добавить лавочку
          </div>
        </div>
      </div>

      <BenchesTable />
    </div>
  )
}