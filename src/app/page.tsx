import styles from '@/styles/pages/home-page.module.scss'
import { YandexMap } from '@/components/widgets/map'
import { LatestBenches } from '@/components/pages/home/latest-benches'
import { Metadata } from 'next'
import cn from 'classnames'

export const metadata: Metadata = {
  title: 'Главная',
  openGraph: {
    title: 'Главная',
  },
}

export default function Home() {
  return (
    <div className={cn(styles['home-page'], 'container')}>
      <h1>
        Расположение лавочек
      </h1>

      <YandexMap className={'mt-40'} />

      <LatestBenches />
    </div>
  )
}
