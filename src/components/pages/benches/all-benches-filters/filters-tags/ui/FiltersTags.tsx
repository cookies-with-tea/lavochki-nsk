import styles from '@/components/pages/benches/all-benches-filters/ui/style.module.scss'
import { Button } from '@/components/shared'

export const FiltersTags = () => {
  return (
    <div>
      <div className={styles['all-benches-filters__header']}>
        <h4>Теги</h4>

        <Button appearance={'dashed'} className={'ml-12'}>Сбросить</Button>
      </div>

      <div>
        tag
      </div>
    </div>
  )
}
