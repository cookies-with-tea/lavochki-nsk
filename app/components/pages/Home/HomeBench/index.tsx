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
import { IBench } from '@/app/interfaces/bench.interface'

const HomeBench: FC<{ bench: IBench }> = ({ bench }): ReactElement => {
  return (
    <StyledLatestBench>
      <div className={'d-f fd-c'}>
        <StyledLatestBenchInfoTitle>
          Лавочка №{bench.id}
        </StyledLatestBenchInfoTitle>
        <StyledLatestBenchInfoLocation>
          <StyledLatestBenchInfoLocationTitle>
            Г. Новосибирск, ул. Зыряновская
          </StyledLatestBenchInfoLocationTitle>
          <StyledLocationButton>
            <CommonIcon name="location" width={24} height={32} />
          </StyledLocationButton>
        </StyledLatestBenchInfoLocation>
        <Link href={`/benches/${bench.id}`} passHref>
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