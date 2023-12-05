'use client'

import { Checkbox, Radio } from '@/components/shared'
import { useState } from 'react'

export const AllBenchesFilters = () => {
  const [radioValue, setRadioValue] = useState('today')
  const [checkboxValue, setCheckboxValue] = useState<Array<string>>([])

  const handleRadioValueChange = (value: string) => {
    setRadioValue(value)
  }

  const handleCheckboxValueChange = (value: string) => {
    setCheckboxValue((oldValues) => [...oldValues, value])
  }

  return (
    <aside>
      <Radio.Group defaultValue="today" onChange={handleRadioValueChange}>
        <Radio label={'сегодня'} value={'today'} />

        <Radio label={'на этой неделе'} value={'upThisWeek'} />

        <Radio label={'в этом месяце'} value={'thisMonth'} />

        <Radio label={'в этом году'} value={'thisYear'} />
      </Radio.Group>

      <Checkbox.Group onChange={handleCheckboxValueChange}>
        <Checkbox label={'сегодня'} value={'today'} />

        <Checkbox label={'на этой неделе'} value={'upThisWeek'} />

        <Checkbox label={'в этом месяце'} value={'thisMonth'} />

        <Checkbox label={'в этом году'} value={'thisYear'} />
      </Checkbox.Group>
    </aside>
  )
}
