import cn from 'classnames'
import cnBind from 'classnames/bind'

type Props = {
  path: { readonly [key: string]: string }
  classNames: cn.ArgumentArray
  additionalClasses?: string
  baseClassName?: string
}

export const classnames = ({ path, additionalClasses, classNames, baseClassName }: Props): string => {
  const cx = cnBind.bind(path)

  return cn(baseClassName, cx(...classNames), additionalClasses)
}
