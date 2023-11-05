import cn from 'classnames'
import cnBind from 'classnames/bind'

type Props = {
  path: { readonly [key: string]: string }
  classNames: cn.ArgumentArray
  additionalClasses?: string
}

export const classnames = ({ path, additionalClasses, classNames }: Props): string => {
  const cx = cnBind.bind(path)

  return cn(additionalClasses ?? '', cx(...classNames)).trim()
}
