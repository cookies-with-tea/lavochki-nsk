import { AutoComplete } from 'antd'
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { useState } from 'react'

import styles from 'widgets/w-header/ui/styles.module.scss'

import { SIcon } from 'shared/ui'

const cx = cnBind.bind(styles)

export const HeaderSearch = () => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([])

  const handleSearch = (value: string) => {
    let res: { value: string; label: string }[] = []

    if (!value || value.indexOf('@') >= 0) {
      res = []
    } else {
      res = ['gmail.com', '163.com', 'qq.com'].map((domain) => ({
        value,
        label: `${value}@${domain}`,
      }))
    }

    setOptions(res)
  }

  return (
    <div className={cn(cx('header-search'))}>
      <SIcon name={'search'} />

      <AutoComplete
        className={'w-100'}
        onSearch={handleSearch}
        placeholder="input here"
        options={options}
      />
    </div>
  )
}
