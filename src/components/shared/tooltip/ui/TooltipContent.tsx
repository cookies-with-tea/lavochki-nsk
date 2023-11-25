import styles from './styles.module.scss'
import { ReactNode } from 'react'

interface ITooltipProps {
  children: ReactNode
}

export const TooltipContent = ({ children }: ITooltipProps) => {
 return (
   <div className={styles['tooltip-content']}>{children}</div>
 )
}
