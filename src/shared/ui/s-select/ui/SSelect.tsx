import { Select, Spin } from 'antd'
import type { SelectProps } from 'antd/es/select'
import cn from 'classnames'
import cnBind from 'classnames/bind'
import debounce from 'lodash.debounce'
import React, { useMemo, useRef, useState } from 'react'

import { OptionType } from 'shared/types'
import styles from 'shared/ui/s-select/ui/styles.module.scss'

const cx = cnBind.bind(styles)

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<
  ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any,
>({ fetchOptions, debounceTimeout = 300, ...props }: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState<ValueType[]>([])
  const fetchRef = useRef(0)

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1

      const fetchId = fetchRef.current

      setOptions([])

      setFetching(true)

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return
        }

        setOptions(newOptions)

        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])

  return (
    <Select
      className={cn(cx('s-select'))}
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  )
}

async function fetchUserList(username: string): Promise<any[]> {
  console.log('fetching user', username)

  return fetch('https://randomuser.me/api/?results=5')
    .then((response) => response.json())
    .then((body) =>
      body.results.map(
        (user: { name: { first: string; last: string }; login: { username: string } }) => ({
          label: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }),
      ),
    )
}

interface IProps {
  onChange?: (items: string[]) => void;
}


export const SSelect = ({ onChange }: IProps) => {
  const [value, setValue] = useState<Array<OptionType>>([])

  const onChangeSelect = (options: OptionType[]) => {
    setValue(options)

    onChange && onChange(options.map(({ value }) => value))
  }

  return (
    <DebounceSelect
      mode={'multiple'}
      value={value}
      placeholder={'Выбрать теги'}
      fetchOptions={fetchUserList}
      onChange={(options) => {
        onChangeSelect(options)
      }}
      style={{ width: '100%' }}
    />
  )
}
