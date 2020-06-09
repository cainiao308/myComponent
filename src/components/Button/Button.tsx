import React  , {FC  , ButtonHTMLAttributes , AnchorHTMLAttributes }from 'react'
import classNames from 'classnames'


export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'

}

interface BaseButtonProps {
    /** prop1 description */
    className?:string;
    disabled?:boolean;
    size?:ButtonSize;
    btnType?:ButtonType;
    children:React.ReactNode;
    href?:string
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
/**
 * 这是第一个Button组件
 * ## Button header
 * ~~~js
 * import { Button } from "cainiao"
 * ~~~
 */
export const Button:FC<ButtonProps> = (props) =>{
    const {
        btnType,
        disabled,
        size,
        className,
        children,
        href,
        ...restProps
    } = props
    //btn , btn-lg , btn-primary
    const classes = classNames(
        'btn' , className,{
            [`btn-${btnType}`]:btnType,
            [`btn-${size}`]:size,
            'disabled': (btnType === ButtonType.Link) && disabled
        }
    )
    
    if (btnType === ButtonType.Link && href){
        return (
            <a href={href} className={classes} {...restProps}>{children}</a>
        )
    }else{
        return (
            <button className={classes} disabled={disabled} {...restProps}>{children}</button>
        )
    }
}

Button.defaultProps = {
    disabled:false,
    btnType: ButtonType.Default
}

export default Button;