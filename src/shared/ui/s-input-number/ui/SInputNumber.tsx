import { InputNumber } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'

interface IProps {
  min?: number | string
  max?: number | string
  defaultValue?: number | string
  size?: SizeType
  stringMode?: boolean
  step?: string
  name?: string
  value?: number | string

  onChange?: (value: number | string | null) => void
}

// TODO: Добавить способ, чтобы не вводились строки
// TODO: Добавлять дженерик динамически
export const SInputNumber = ({
  min = 0,
  max = 99,
  size = 'large',
  stringMode = false,
  defaultValue = 0,
  step = '1',
  name,
  value = 0,

  onChange
}: IProps) => {
  return (
    <>
      { stringMode
       ? (
        <InputNumber<string>
          min={String(min)}
          max={String(max)}
          stringMode={stringMode}
          defaultValue={String(defaultValue)}
          step={step}
          size={size}
          name={name}
          value={String(value)}
          onChange={onChange}
        />
      )
        : (
          <InputNumber
            min={min}
            max={max}
            stringMode={stringMode}
            defaultValue={defaultValue}
            size={size}
            name={name}
            value={value}
            onChange={onChange}
          />
        )
    }
    </>
  )
}
