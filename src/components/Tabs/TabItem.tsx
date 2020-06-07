import React , {useState , useContext} from 'react'
import classNames from 'classnames'
import {TabContext} from './Tabs'

export interface TabItemProps {
    label:string,
    disabled?:boolean
    className?:string,
    style?:React.CSSProperties,
    index:number,
    children:string
}

const Tabs:React.FC<TabItemProps> = ({children , disabled  , label , className , style , index}) =>{
    const context = useContext(TabContext)
    const classes = classNames('tab-item' , className , {
        'is-active': context.index === index,
        'is-disabled':disabled
    })
    
    const handleClick = ()=>{
        if(context.onSelect && !disabled){
            context.onSelect(index)
            console.log(children)
        }   
    }

    return (
        <li style={style} onClick={handleClick} className={classes}>
            {label}
        </li>
    )
}



export default Tabs