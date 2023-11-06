import Image from 'next/image'
import { ImageProps } from 'next/dist/shared/lib/get-img-props'

export const BaseImage = (props: ImageProps) => {
	return (
  <div>
    <Image {...props} alt={props.alt} />
  </div>
	)
}
