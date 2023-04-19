import { BaseIcon } from '@/shared/ui'

interface IProps {
  title: string
}

export const BaseNoData = ({ title }: IProps) => {
  return (
    <div className={'d-f ai-c jc-c fd-c'}>
      <BaseIcon name={'no-data'} width={400} height={400} className={'mb-10'} />

      <h2>{ title }</h2>
    </div>
  )
}