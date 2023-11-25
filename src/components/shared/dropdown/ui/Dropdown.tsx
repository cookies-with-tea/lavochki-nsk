'use client'

import { useState } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'

// interface IdropdownProps {
// 	showArrow?: boolean
// 	children: ReactNode
// 	content: ReactNode
// 	position: string
// 	className: string
// 	trigger: 'hover' | 'click'
// }

export const Dropdown = ({ content, children, position = 'bottom', customClassName }: any) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className={styles['dropdown-wrapper']}>
      <div
        className={styles['dropdown-children']}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>

      {isHovered && (
        <div
          className={classNames(
            styles.dropdown,
            styles[`dropdown-${position}`],
            customClassName
          )}
        >
          <div className={styles['dropdown-content']}>{content}</div>
        </div>
      )}
    </div>
  )
}
