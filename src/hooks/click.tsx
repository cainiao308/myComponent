import React , {useEffect , RefObject} from 'react'


function useClick(ref:RefObject<HTMLElement> , handler:Function){
    console.log(456);
    console.log(ref.current)
    useEffect(()=>{
        console.log(789)
        const listener = (event:MouseEvent)=>{
            if (!ref.current || ref.current.contains(event.target as HTMLElement)){
                return
            }
            handler()
        }
        document.addEventListener('click' , listener)
        return ()=>{
            document.removeEventListener('click' , listener)
        }
    } , [ref , handler])
}

export default useClick