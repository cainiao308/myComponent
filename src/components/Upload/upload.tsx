import React, { useRef  , useState} from 'react'
import classNames from 'classnames'
import Button ,{ButtonType } from '../Button/Button'

interface UploadProps {
    name?:string
}


const Upload :React.FC<UploadProps> = (props) =>{
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            console.log(e.target.files[0])
        }
        
    }
    const handleClick = (e:React.MouseEvent) =>{
        if(inputRef.current){
            inputRef.current.click()
        }
       
    }

    return (
        <div className="cainiao-upload">
            <Button btnType={ButtonType.Primary} onClick={handleClick}>Upload</Button>
            <input type="file" onChange={handleChange} ref={inputRef} style={{display:"none"}}/>
        </div>
    )
}


export default Upload