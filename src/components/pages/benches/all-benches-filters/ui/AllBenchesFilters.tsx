'use client'

import { Radio } from '@/components/shared'
import { useState } from 'react'

export const AllBenchesFilters = () => {
  const [radioValue, setRadioValue] = useState('today')

  const handleRadioValueChange = (value: string) => {
    setRadioValue(value)
  }

  return (
    <aside>
      <Radio.Group defaultValue="today" onChange={handleRadioValueChange}>
        <Radio label={'сегодня'} value={'today'} />

        <Radio label={'на этой неделе'} value={'upThisWeek'} />

        <Radio label={'в этом месяце'} value={'thisMonth'} />

        <Radio label={'в этом году'} value={'thisYear'} />
      </Radio.Group>
    </aside>
  )
}
