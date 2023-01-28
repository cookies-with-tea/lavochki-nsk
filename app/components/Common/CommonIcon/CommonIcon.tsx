import React, { FC } from 'react'
import { StyledSvg } from '@/app/components/Common/CommonIcon/CommonIconStyles'
import { IProps } from '@/app/components/Common/CommonIcon/CommonIcon.interface'
import { NoSsr } from '@mui/base'

const CommonIcon: FC<IProps> = (
  { className = '',
    name,
    fillColor='#000',
    width=32,
    height=32,
    reverse= false
  }
) => {
  const isReverse = reverse ? 'reverse' : ''

  return (
    <NoSsr>
      <StyledSvg
        xmlns="http://www.w3.org/2000/svg"
        className={`app-icon ${name}--icon ${className} ${isReverse}`}
        fill={fillColor}
        width={width}
        height={height}
        aria-hidden="true"
      >
        <use xlinkHref={`#${name}`} href={`#${name}`} />
      </StyledSvg>
    </NoSsr>

  )
}

export default CommonIcon