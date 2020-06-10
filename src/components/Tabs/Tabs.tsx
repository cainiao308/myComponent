import React , {useState , createContext ,FC , Children ,FunctionComponentElement} from 'react'
import classNames from 'classnames'
import {TabItemProps} from './TabItem'


interface TabProps {
    defaultIndex:number,
    onSelect?: (index:number) => void
    className?:string,
    style?:string
}

interface IContext {
    index?:number,
    onSelect?:(index:number) => void
}

export const TabContext = createContext<IContext>({index:0})

export const Tabs:FC<TabProps> = ({children , defaultIndex , onSelect,className}) =>{
    const [currentActive , setActive] = useState(defaultIndex)
    const classes = classNames('tab' , className)
    const handleClick = (index:number)=>{
        setActive(index)
        if(onSelect) onSelect(index)
    }

    const renderContent = ()=>{
        const childrenComponent = Children.map(children , (child  , i ) =>{
            const childElement = child as FunctionComponentElement<TabItemProps>
            if (childElement.props.index === currentActive ){
                return childElement.props.children 
            }else{
                console.error('error333')
            }
        })
        return (
            <div style={{paddingLeft:"3rem"}}>
                {childrenComponent}
            </div>
        )
    }

    
    const PassedContext = {
        index:currentActive,
        onSelect:handleClick
    }
    return (
        <div>
            <ul className={classes}>
                <TabContext.Provider value={PassedContext}>
                    {children}
                </TabContext.Provider>
            </ul>
            {renderContent()}
        </div>
        
    )
}



export default Tabs;