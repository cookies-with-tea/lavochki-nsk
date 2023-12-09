import styles from '@/components/pages/benches/all-benches-filters/ui/style.module.scss'
import filtersTagsStyles from './style.module.scss'
import { Button } from '@/components/shared'
import { useEffect, useState } from 'react'
import { filtersTagsList } from '@/components/pages/benches/all-benches-filters/filters-tags/constants'
import { BenchTypes } from '@/shared/types/bench'
import cb from 'classnames/bind'
import cn from 'classnames'
import { filtersTagsConfig } from '@/components/pages/benches/all-benches-filters/filters-tags/config'

const cx = cb.bind(filtersTagsStyles)

export const FiltersTags = () => {
  const [tags, setTags] = useState<BenchTypes.Tags>(filtersTagsList)
  const [sliceTagsValue, setSliceTagsValue] = useState(filtersTagsConfig.VISIBLE_TAGS_COUNT)

  const [isExpanded, setIsExpanded] = useState(false)
  const [isExpandButtonVisible, setIsExpandButtonVisible] = useState(false)

  // Изменение данных на более удобные для фронта.
  const mapTagsData = () => {
    const newChips = tags.map((tag) => (
      { ...tag, selected: false }
    ))

    setTags(newChips)
  }

  // Смена активного тега
  const handleActiveStateChange = (id: BenchTypes.Tag['id']) => {
    setTags(tags.map((tag) => {
      if (tag.id === id) {
        return { ...tag, selected: !tag.selected }
      }

      return tag
    }))
  }

  // Изменение количества видимых тегов
  const handleTagsCountVisibleChange = () => {
    isExpanded ? setSliceTagsValue(filtersTagsConfig.VISIBLE_TAGS_COUNT) : setSliceTagsValue(tags.length)

    setIsExpanded(!isExpanded)
  }

  // Сбрасываем состояние тегов
  const handleTagsReset = () => {
    setTags(tags.map((tag) => (
      { ...tag, selected: false }
    )))
  }

  // Список тегов
  const TagsList = () => {
    return (
      <ul className={cn('mt-24', cx('filters-tags__list'))}>
        { tags.map((tag) => (
          <li key={tag.id}>
            <button
              className={cx('filters-tags__tag', { selected: tag.selected })}
              onClick={() => handleActiveStateChange(tag.id)}
            >
              { tag.title }
            </button>
          </li>
        )).splice(0, sliceTagsValue) }
      </ul>
    )
  }

  useEffect(() => {
    mapTagsData()

    setIsExpandButtonVisible(tags.length >= sliceTagsValue)
  }, [tags.length])

  return (
    <div>
      <div className={styles['all-benches-filters__header']}>
        <h4>Теги</h4>

        <Button
          appearance={'dashed'}
          className={'ml-12'}
          onClick={handleTagsReset}
        >
          Сбросить
        </Button>
      </div>

      <TagsList />

      {
        isExpandButtonVisible && (
          <Button
            appearance={'link-underline'}
            className={styles['all-benches-filters__expand-button']}
            onClick={handleTagsCountVisibleChange}
          >
            { !isExpanded ? 'Показать все' : 'Скрыть' }
          </Button>
        )
      }
    </div>
  )
}
