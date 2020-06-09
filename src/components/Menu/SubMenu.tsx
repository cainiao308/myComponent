import React, { useContext ,useState } from 'react'
import classNames from 'classnames'
import {MenuContext} from './Menu'
import  {MenuItemProps} from './MenuItem'
import Icon from '../Icon/icon'

interface SubMenuProps {
    index?:string,
    title:string,
    className?:string
}


const SubMenu:React.FC<SubMenuProps> = ({index , title , className , children}) => {
    const [open , setOpen] = useState(false)
    const context = useContext(MenuContext)
    const classes = classNames('menu-item submenu-item' , className ,{
        'is-active': context.index === index,
        'is-open':open,
        'is-vertical':context.mode === 'vertical'
    })

    const handleClick = (e:React.MouseEvent)=>{
        e.preventDefault()
        setOpen(!open)
    }

    const handleMouse = (e:React.MouseEvent , toggle:boolean) =>{
        e.preventDefault()
        setOpen(toggle)
    }

    const clickEvents = context.mode === 'vertical' ? {
        onClick:handleClick
    }:{}

    const hoverEvents = context.mode !== 'vertical'? {
        onMouseEnter:(e:React.MouseEvent) =>{handleMouse(e , true)},
        onMouseLeave:(e:React.MouseEvent) =>{handleMouse(e , false)},
    }:{}

    const renderChildren = ()=>{
        const subMenuClassed = classNames('cainiao-submenu' , {
            'menu-opened':open,
           
        })
        const childrenComponent = React.Children.map(children , (child  , i ) =>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem' ){
                return React.cloneElement(childElement , {
                    index:`${index}-${i}`
                })
            }else{
                console.error('error333')
            }
        })
        return (
            <ul className={subMenuClassed} >
                {childrenComponent}
            </ul>
        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
                <Icon icon="angle-down" className="arrow-icon"/>
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu