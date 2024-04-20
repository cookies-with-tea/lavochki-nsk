import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core'

import { UiButton } from '#shared/ui'

import styles from './styles.module.scss'

export const ThemeSwitch = () => {
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('dark')

  const handleColorSchemeToggle = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <UiButton className={styles['theme-switch']} onClick={handleColorSchemeToggle}>
      Сменить тему
    </UiButton>
  )
}
