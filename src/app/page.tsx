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
    <div className={cn(styles['home-page'])}>
      <div className={'container'}>
        <h1>
          Расположение лавочек
        </h1>
      </div>

      <YandexMap className={'container'} />

      <div className={'container'}>
        <LatestBenches />
      </div>
    </div>
  )
}
