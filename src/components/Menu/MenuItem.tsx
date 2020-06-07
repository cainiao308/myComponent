import React, { useContext } from 'react'
import classNames from 'classnames'
import {MenuContext} from './Menu'


export interface MenuItemProps {
    index ?:string;
    disabled?:boolean;
    className?:string;
    style?:React.CSSProperties
}


const MenuItem :React.FC<MenuItemProps> = (props) =>{
    //取出传递过来的属性
    const {index , disabled , className , style , children} = props
    //取出context
    const context = useContext(MenuContext)
    //生成classes
    const classes = classNames('menu-item' , className , {
        'is-disabled' : disabled,
        'is-active':context.index === index
    })
    //调用父传过来的方法
    const handleClick = ()=>{
        if(context.onSelect && !disabled && typeof index === 'string'){
            context.onSelect(index)
        }
    }

    return (
        <li className={classes} style={style} onClick={handleClick}>{children}</li>
    )
}


MenuItem.displayName = 'MenuItem'

export default MenuItem