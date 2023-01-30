import { FC, ReactElement } from 'react'
import Image from 'next/image'

import {
  StyledBenchCard,
  StyledBenchTitle,
  StyledBenchWrapper,
  StyledImageWrapper,
  StyledOpenlink,
  StyledRatingCount,
  StyledTag,
  StyledTags
} from '@/app/components/Common/ui/Bench/BenchCard/BenchesCard.styles'
import CommonIcon from '@/app/components/Common/ui/CommonIcon/CommonIcon'
import Link from 'next/link'
import { BenchType } from '@/app/types/bench.type'

interface IProps {
  bench: BenchType
}

const BenchCard: FC<IProps> = ({ bench }): ReactElement => {
  return (
    <StyledBenchCard>
      <StyledImageWrapper>
        <Image
          src={bench.images[0]}
          alt="image"
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="cover"
        />
      </StyledImageWrapper>
      <StyledBenchWrapper>
        <StyledBenchTitle>Лавочка на Каменской</StyledBenchTitle>
        <StyledTags>
          {
            bench.tags &&
            bench.tags.map((item) => (
              <StyledTag key={item.id}>
                #{item.title}
              </StyledTag>
            ) )
          }
        </StyledTags>
        <div className={'d-f ai-c jc-sb'}>
          <Link href={`/benches/${bench.id}`} passHref>
            <StyledOpenlink>
              Открыть
            </StyledOpenlink>
          </Link>
          <div className={'d-f ai-c'}>
            <CommonIcon name="star" width={16} height={16} />
            <StyledRatingCount>
              4.2
            </StyledRatingCount>
          </div>
        </div>
      </StyledBenchWrapper>
    </StyledBenchCard>
  )
}

export default BenchCard