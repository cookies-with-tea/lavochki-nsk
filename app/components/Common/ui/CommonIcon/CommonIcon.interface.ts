export interface IProps {
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
     */
    className?: string
    /**
     * reverse - reverse image
     */
    reverse?: boolean
}