import Image from 'next/image'
import { ImageProps } from 'next/dist/shared/lib/get-img-props'
import cn from 'classnames'
import cb from 'classnames/bind'
import styles from './styles.module.scss'

type BaseImageProps = ImageProps & {
	rounded?: boolean
}

const cx = cb.bind(styles)

export const BaseImage = (props: BaseImageProps) => {
	const formattedProps = { ...props }

	delete formattedProps.rounded

	const classNames = cn('base-image', cx(
		'base-image',
		{ 'base-image--rounded': props.rounded }
	))

	return (
  <div className={classNames}>
    <Image {...formattedProps} alt={props.alt} />
  </div>
	)
}
