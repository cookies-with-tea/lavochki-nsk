import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from 'pages/error-500/ui/styles.module.scss'

import { SButton, SIcon } from 'shared/ui'

// TODO: Добавить 3-ую шестерню
// TODO: Заезжают пиксели, надо поправить
export const Error500 = () => {
  const navigate = useNavigate()

  const gearRefs = useRef<Array<HTMLDivElement>>([])
  const startTime = useRef(performance.now())
  const [rAF, setRAF] = useState<number>()

  // Функция для анимации поворота
  const animate = () => {
    const elapsedTime = (performance.now() - startTime.current) / 1000 // Преобразование времени в секунды

    gearRefs.current.forEach((gearRef, index) => {
      if (gearRef) {
        let rotationSpeed = 50 // Скорость вращения по умолчанию в градусах в секунду

        if (index % 2 !== 0) {
          // Если индекс нечетный (второй компонент), уменьшаем скорость вращения
          rotationSpeed = 50 // Новая скорость вращения для второго компонента
        }

        const rotation = ((index % 2 === 0 ? 1 : -1) * elapsedTime * rotationSpeed) % 360

        gearRef.style.transform = `rotate(${rotation + 21}deg)`
      }
    })
    const localRAF = requestAnimationFrame(animate)

    setRAF(localRAF)
  }

  useEffect(() => {
    // Инициализация refs для каждого компонента SIcon
    gearRefs.current = gearRefs.current.slice(0, 2)

    // Запуск анимации
    animate()

    // Очистка refs при размонтировании компонента
    return () => {
      gearRefs.current = []

      if (rAF) {
        cancelAnimationFrame(rAF)
      }
    }
  }, [])

  return (
    <div className={styles['error-500']}>
      <div className={styles['error-500__content']}>
        <h1>Произошла ошибка</h1>
        <h2 className={'mt-28'}>Ведутся технические работы</h2>

        <div className={styles['error-500__gears']}>
          <div className={styles['error-500__gear']} ref={(el) => { if (el) gearRefs.current[0] = el }}>
            <SIcon name={'gear'} />
          </div>
          <div className={styles['error-500__gear']} ref={(el) => { if (el) gearRefs.current[1] = el }}>
            <SIcon name={'gear'} />
          </div>
        </div>

        <SButton className={'mt-16'} appearance={'dashed'} onClick={() => { navigate('/') }}>На главную</SButton>
      </div>
    </div>
  )
}
