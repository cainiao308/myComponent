import React, { FC , useState ,ReactElement , useEffect , useRef} from 'react'
import classNames from 'classnames'
import Input ,{InputProps} from '../Input/input'
import useDebounce from '../../hooks/debounce'
import useClick from '../../hooks/click'
import Icon from '../Icon/icon'

interface DataSourceObject {
    value:string;
}

export type DataSourcetYPE<T = {}> = T & DataSourceObject 

interface autocompleteProps extends InputProps{
    fetchSuggretions:(keyword: string )=> DataSourcetYPE[]  | Promise<DataSourcetYPE[]>,
    onSelects?: (item:DataSourcetYPE ) => void,
    renderOptions?: (item:DataSourcetYPE) =>ReactElement
}


const AutoComplete: FC<autocompleteProps> = (props) => {
    console.log(1111);
    
    //键盘输入
    const [inputvalue , setValue] = useState('')
    //下拉栏里面的数据，初始化为空
    const [sug , setSug] = useState<DataSourcetYPE[]>([])
    const {fetchSuggretions , onSelects , value , renderOptions,...restProps} = props
    const [loading , setLoading] = useState(false)
    const debounceValue = useDebounce(inputvalue , 500)
    const trigger = useRef(false)
    const [hilight , setHilight] = useState(-1)
    const componentRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
      if(sug.length){
        const lis = (e:MouseEvent)=>{
            if (!componentRef.current || componentRef.current.contains(e.target as HTMLElement)){
                return
            }
            setSug([])
        }
        document.addEventListener('click' , lis)
        return ()=>{
            console.log('remove')
            document.removeEventListener('click' , lis)
        }
      }
    })
    //useClick(componentRef , ()=>{setSug([])})

    useEffect(() => {
        if(debounceValue && trigger.current){
            const results = fetchSuggretions(debounceValue)
            if (results instanceof Promise){
                setLoading(true)
                results.then(res=>{
                    //console.log(res);
                    setLoading(false)
                    setSug(res)
                })
            }else{
                setSug(results)
            }
        }else{
            console.log(222);
            setSug([])
        }
        console.log(333)
        setHilight(-1)
        
    }, [debounceValue])

 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        //输入改变时setValue
        setValue(e.target.value)
        trigger.current = true
    }

    const renderTemplate = (item:DataSourcetYPE)=>{
        return renderOptions ? renderOptions(item):item
    }

    const handleItem = (item:DataSourcetYPE)=>{
        console.log(componentRef.current);
        
        setValue(item.value)
        setSug([])
        if(onSelects){
            onSelects(item)
        }
        trigger.current = false
    }
    const renderItem = ()=>{
        if(sug.length){
            return (
                <ul className="auto-list">
                    {
                        sug.map((item,index) =>{
                            const cnames = classNames({
                                'highlighted':index === hilight
                            })
                            return (
                            <li key={index} onClick={()=>{handleItem(item)}} className={cnames}>
                                {renderTemplate(item)}
                             </li>
                            )
                        })
                    }
                </ul>
            )
        }else{
            return null
        }
      
    }

    const handleKeyDown = (e:React.KeyboardEvent)=>{
        switch(e.keyCode){
            case 13:
                if(sug[hilight]){
                    handleItem(sug[hilight])
                }
                break
            case 38:
                setHilight(hilight - 1)
                break
            case 40:
                setHilight(hilight + 1)
                break
            case 27:
                setSug([])
                break
            default:
                break
        }
    }
    return (
        <div className="cainiao-autocomplete" ref={componentRef}>
            <Input onChange={handleChange} {...restProps} value={inputvalue} onKeyDown={handleKeyDown}/>
           {
               loading ? <div className="waiting"><Icon icon="coffee"/></div>:renderItem()
           }
        </div>
    )
}


export default AutoComplete