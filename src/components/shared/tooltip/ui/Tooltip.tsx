'use client'

import { useState } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'
import { TooltipContent } from '@/components/shared/tooltip/ui/TooltipContent'
import { useClickOutside } from '@/shared/lib/hooks'

// interface ITooltipProps {
// 	showArrow?: boolean
// 	children: ReactNode
// 	content: ReactNode
// 	position: string
// 	className: string
// 	trigger: 'hover' | 'click'
// }

// TODO: check https://codesandbox.io/p/sandbox/react-compound-components-hr6n1?file=%2Fsrc%2FApp.js

export function Tooltip ({ content, children, position = 'bottom', customClassName }: any) {
	const [isHovered, setIsHovered] = useState(false)

  const ref = useClickOutside(() => setIsHovered(false))

	const hoverTooltipClasses = classNames(
		styles.tooltip,
		styles[`tooltip-${position}`],
		customClassName
	)

	return (
  <div className={styles['tooltip-wrapper']} ref={ref}>
    <div
      className={styles['tooltip-children']}
      onClick={() => setIsHovered(!isHovered)}
    >
      {children}
    </div>

    {isHovered && (
      <div
        className={[hoverTooltipClasses, 'tooltip-hover'].join(' ').trim()}
      >
        { content }
      </div>
        )}
  </div>
	)
}

Tooltip.Content = TooltipContent

