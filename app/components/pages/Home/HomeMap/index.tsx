import { FC, ReactElement } from 'react'
import { BenchType } from '@/app/types/bench.type'
import BenchesMap from '@/app/components/ui/Benches/BenchesMap'

interface IProps {
  benches?: BenchType[]
}

const HomeMap: FC<IProps> = ({ benches }): ReactElement => {
  return (
    <div className="mb-52">
      <h2>Расположение лавочек</h2>
      <BenchesMap height={500} benches={benches} />
    </div>
  )
}

export default HomeMap
