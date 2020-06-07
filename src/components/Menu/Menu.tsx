import React, { createContext  , useState} from 'react'
import classNames from 'classnames'
import  {MenuItemProps} from './MenuItem'


type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex:string) => void

interface MenuProps {
    defaultIndex?:string;
    className?:string;
    mode?:MenuMode;
    style?:React.CSSProperties;
    onSelect?: SelectCallback
}


interface IMemuContext {
    index:string;
    onSelect?:SelectCallback
    mode?:MenuMode
}

export const MenuContext = createContext<IMemuContext>({index:"0"})

const Menu: React.FC<MenuProps> = (props) =>{
    //取出外层传递过来的属性
    const {className , defaultIndex,mode , style , children ,onSelect} = props
    //定义一个状态，用来切换样式
    const [currentActive , setActive] = useState(defaultIndex)
    //生成classes
    const classes = classNames('cainiao-menu' , className , {
        'menu-vertical' : mode === 'vertical',
        'menu-horizontal' : mode !== 'vertical'
    })
    const handleClick = (index:string) =>{
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }
    //给子组件传递的属性或者方法（传递index和切换函数给所有子组件）
    const passedContext:IMemuContext = {
        index:currentActive?currentActive:"0",
        onSelect:handleClick , 
        mode:mode
    }
    //这里理解不了（为了保证所有子组件都是MenuItem类型）
    const renderChildren = ()=>{
        return React.Children.map(children , (child ,index) =>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem' || 'SubMenu'){
                return React.cloneElement(childElement , {
                    index:index.toString()
                })
            }else{
                console.error('error')
            }
        })
    }
    return (
        <ul className={classes} style = {style}>
            <MenuContext.Provider value={passedContext}>
            {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex:"0",
    mode:'horizontal'
}


export default Menu