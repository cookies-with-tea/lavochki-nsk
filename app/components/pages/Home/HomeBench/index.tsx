import React, { FC, ReactElement } from 'react'
import {
  StyledHomeBenchesSlider,
  StyledLatestBench,
  StyledLatestBenchInfoLocation,
  StyledLatestBenchInfoLocationTitle,
  StyledLatestBenchInfoTitle,
  StyledLink,
  StyledLocationButton
} from '@/app/components/pages/Home/HomeBench/HomeBench.style'
import Link from 'next/link'
import CommonIcon from '@/app/components/Common/CommonIcon/CommonIcon'
import { BenchType } from '@/app/types/bench.type'

interface IProps {
  bench: BenchType
}

const HomeBench: FC<IProps> = ({ bench }): ReactElement => {
  return (
    <StyledLatestBench>
      <div className={'d-f fd-c'}>
        <StyledLatestBenchInfoTitle>
          Лавочка №{bench.id}
        </StyledLatestBenchInfoTitle>
        <StyledLatestBenchInfoLocation>
          <StyledLatestBenchInfoLocationTitle>
            { bench.address }
          </StyledLatestBenchInfoLocationTitle>
          <StyledLocationButton>
            <CommonIcon name="location" width={24} height={32} />
          </StyledLocationButton>
        </StyledLatestBenchInfoLocation>
        <Link href={`/benches/${bench.id}`} passHref shallow>
          <StyledLink>Смотреть</StyledLink>
        </Link>
      </div>

      {
        bench.images
        && bench.images.length
          ? <StyledHomeBenchesSlider images={bench.images} />
          : <></>
      }

    </StyledLatestBench>
  )
}

export default HomeBench