import {useEffect , useState} from 'react'


const useDebounce = (value:string , delay:number)=>{
    const [debounceValue , setDebounceValue] = useState(value)

    useEffect(() => {
        const i = setTimeout(()=>{
            setDebounceValue(value)
        } , delay)
        return () => {
            clearTimeout(i)
        }
    }, [value , delay])

    return debounceValue
}

export default useDebounce