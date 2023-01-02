import React, { FC, ReactElement } from 'react'
import Link from 'next/link'
import HomeBench from '@/app/components/pages/Home/HomeBench'
import { StyledAllBenchesLink }
  from '@/app/components/pages/Home/HomeBenches/HomeBenches.style'
import { BenchType } from '@/app/types/bench.type'

interface IProps {
  benches?: BenchType[]
}

const HomeBenches: FC<IProps> = ({ benches }): ReactElement => {
  return (
    <div className={'home-benches'}>
      <div className="d-f ai-c jc-sb mb-40">
        <h3>Последние добавленные</h3>
        <Link href="/benches" passHref shallow>
          <StyledAllBenchesLink>
            Смотреть все
          </StyledAllBenchesLink>
        </Link>
      </div>
      {
        benches &&
        benches.map((bench) => <HomeBench key={bench.id} bench={bench} />)
      }
    </div>
  )
}

export default HomeBenches