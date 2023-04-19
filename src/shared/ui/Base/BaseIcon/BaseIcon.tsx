export interface IProps {
  name: string;
  fillColor?: string;
  width: number;
  height: number;
  className?: string;
  reverse?: boolean;
}

export const BaseIcon = ({
  className = '',
  name,
  fillColor = '#333',
  width = 32,
  height = 32,
  reverse = false,
}: IProps) => {
  const isReverse = reverse ? 'reverse' : ''

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`app-icon ${name}--icon ${className} ${isReverse}`}
      width={width}
      height={height}
      aria-hidden="true"
    >
      <use xlinkHref={`#${name}`} href={`#icon-${name}`} fill={fillColor} />
    </svg>
  )
}
