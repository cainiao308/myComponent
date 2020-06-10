import React , { FC  , InputHTMLAttributes} from 'react'
import classNames from 'classnames'
import Icon , {IconProps}from '../Icon/icon'


interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement> , 'size' >{
    disabled?:boolean,
    size?:string,
    icon?:IconProps,
    prepend?:string | React.ReactNode,
    append?:string | React.ReactNode,
}



const Input:FC<InputProps> = (props) =>{
    const {disabled , size , icon  , prepend , append  ,...restProps } = props
    const classes = classNames('cainiao-input' , {
        'append': !!append,
        'pre':!!prepend
    })

    // const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    //     onChange(e)
    // }

    return (
        <div className={classes}>
            {prepend && <div className="input-pre">{prepend}</div>}
            {icon && <div className="icon-wrapper"></div>}
            <input
                className="input-inner"
                disabled={disabled}
                {...restProps}
            />
            {append && <div className="input-append">{append}</div>}
        </div>
    )
}


export default Input