import { FC, ReactElement, useState } from 'react'

import { StyledOrderIcon }
  from '@/app/components/pages/Benches/BenchesSort/BenchesSort.styles'

import { StyledSortItem, StyledSortTitle }
  from '@/app/components/pages/Benches/BenchesSidebar/BenchesSidebar.styles'

const setOrder = (currentSort: string): string => {
  switch (currentSort) {
  case 'desc': {
    return ''
  }

  case 'asc': {
    return 'desc'
  }

  default: {
    return 'asc'
  }
  }
}

const BenchesSort: FC = (): ReactElement => {
  const [sort, setSort] = useState([
    { id: 1, label: 'Дате добавления', value: 'date', order: '' },
    { id: 2, label: 'Рейтингу', value: 'raring', order: '' },
    { id: 3, label: 'Количеству отзывов', value: 'reviews', order: '' },
  ])

  const handleChangeSort = (sortId: number): void => {
    const newSort = sort.map((item) => {
      if (item.id === sortId) {
        const newOrder = setOrder(item.order)

        return { ...item, order: newOrder }
      }

      return { ...item, order: '' }
    })

    setSort(newSort)
  }

  return (
    <div className="d-f ai-c mb-42">
      <StyledSortTitle>
        Сортировать по:
      </StyledSortTitle>
      <nav>
        <ul className="d-f">
          { sort.map((item) => (
            <StyledSortItem
              key={item.id}
              onClick={handleChangeSort.bind(null, item.id)}
            >
              { item.label }
              {
                item.order !== ''
                  && (
                    <StyledOrderIcon
                      name="sort-arrow"
                      width={9}
                      height={14}
                      reverse={item.order === 'desc'}
                    />
                  )
              }
            </StyledSortItem>
          )) }

        </ul>
      </nav>
    </div>
  )
}

export default BenchesSort