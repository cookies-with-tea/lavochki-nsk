import React, {FC} from 'react';

interface IProps {
    /**
     * name - Name of svg icon
     */
    name: string
    /**
     * color - Color of icon. Attributes in svg need to set currentColor. Default - #000
     */
    fillColor?: string
    /**
     * width - Width of icon. Default - 32
     */
    width: number
    /**
     * Height - Width of icon. Default - 32
     */
    height: number
    /**
    * className - Class name
    * */
    className?: string
}

const CommonIcon: FC<IProps> = ({ className = '', name, fillColor='#000', width=32, height=32 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`app-icon ${name}--icon ${className}`}
            fill={fillColor}
            width={width}
            height={height}
            aria-hidden="true"
        >
            <use xlinkHref={`#${name}`} href={`#${name}`} />
        </svg>
    )
};

export default CommonIcon;