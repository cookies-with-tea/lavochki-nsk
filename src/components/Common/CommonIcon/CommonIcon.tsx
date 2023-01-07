import React, { FC } from 'react'
import {IProps} from "@/components/Common/CommonIcon/CommonIcon.interface";
import {StyledSvg} from "@/components/Common/CommonIcon/CommonIconStyles";

const CommonIcon: FC<IProps> = ({
    className = '',
    name,
    fillColor='#333',
    width=32,
    height=32,
    reverse= false,
  }
) => {
  const isReverse = reverse ? 'reverse' : ''

  return (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      className={`app-icon ${name}--icon ${className} ${isReverse}`}
      width={width}
      height={height}
      aria-hidden="true"
    >
      <use xlinkHref={`#${name}`} href={`#icon-${name}`} fill={fillColor} />
    </StyledSvg>
  )
}

export default CommonIcon