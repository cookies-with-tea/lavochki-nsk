'use client'

import { useState } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'

// interface ITooltipProps {
// 	showArrow?: boolean
// 	children: ReactNode
// 	content: ReactNode
// 	position: string
// 	className: string
// 	trigger: 'hover' | 'click'
// }

export const Tooltip = ({ content, children, position = 'top', customClassName }: any) => {
	const [isHovered, setIsHovered] = useState(false)

	return (
  <div className={styles['tooltip-wrapper']}>
    <div
      className={styles['tooltip-children']}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>

    {isHovered && (
      <div
        className={classNames(
						styles.tooltip,
						styles[`tooltip-${position}`],
						customClassName
        )}
      >
        <div className={styles['tooltip-content']}>{content}</div>
      </div>
			)}
  </div>
	)
}
