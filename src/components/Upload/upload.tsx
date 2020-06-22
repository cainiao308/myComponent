import React, { useRef  , useState} from 'react'

import Button ,{ButtonType } from '../Button/Button'
import axios from 'axios'
import UploadList from './uploadList'

interface UploadProps {
    action:string;
    onProgress?:(percentage:number , file:File) => void;
    onSucess?:(data:any , file:File) =>void;
    onError?:(err:any , file:File) => void;
    beforeUpload?:(file:File) => boolean | Promise<File>
}

type UploadFileStatus = 'ready' | 'uploading' | 'sucess' | 'error'

export interface UploadFile {
    uid:string;
    size:number;
    name:string;
    status?:UploadFileStatus;
    percent?:number;
    raw?:File;
    response?:any;
    error?:any
}


const Upload :React.FC<UploadProps> = (props) =>{
    const {action , onError , onProgress ,onSucess , beforeUpload} = props
    const inputRef = useRef<HTMLInputElement>(null)
    const [fileList , setFileList] = useState<UploadFile[]>([])
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const files = e.target.files
        if(files){
            
            uploadFiles(files)
        }
        if(inputRef.current){
            inputRef.current.value = ''
        }
    }
    //发请求的方法
    const post = (file:File)=>{
        let _file:UploadFile = {
            uid: Date.now() + 'upload',
            size:file.size,
            name:file.name,
            status:'ready',
            raw:file,
            percent:0
        }
        setFileList([_file , ...fileList])
        const formData = new FormData()
        formData.append('file' , file)
        axios.post(action , formData , {
            headers:{
                'Content-Type':'multipart/form-data',
                "Access-Control-Allow-Origin":"*"
            },
            onUploadProgress:(e)=>{
                let percentage = Math.round((e.loaded * 100 ) / e.total) || 0
                if(percentage < 100){
                    // prelist = [{uid: "1592299108847upload",size: 1086184,name: "test_new_name",status: "ready",percent: 98}]
                    setFileList(preList=>{
                        console.log(999);
                        return preList.map(item=>{
                            if(item.uid === _file.uid){
                                item.percent = percentage
                                item.status = 'uploading'
                                return item
                                //return {...item , percent:percentage , status:'uploading'}
                            }else{
                                return item
                            }
                        })
                        
                    })
                    if(onProgress){
                        onProgress(percentage , file)
                    }
                }
            }
        }).then(resp=>{
            //console.log(resp.data)
            setFileList(preList=>{
                console.log(999);
                return preList.map(item=>{
                    if(item.uid === _file.uid){
                        item.percent = 100
                        item.status = 'sucess'
                        return item
                        //return {...item , percent:percentage , status:'uploading'}
                    }else{
                        return item
                    }
                })
                
            })
            if(onSucess){
                onSucess(resp.data , file)
            }
        }).catch(err=>{
            //console.log(err);
            setFileList(preList=>{
                return preList.map(item=>{
                    if(item.uid === _file.uid){
                        item.percent = 100
                        item.status = 'error'
                        return item
                        //return {...item , percent:percentage , status:'uploading'}
                    }else{
                        return item
                    }
                })
                
            })
            if(onError){
                onError(err , file)
            }
        })
    }

    const uploadFiles = (files:FileList)=>{
        //console.log(files)
        let postFiles = Array.from(files)
        //console.log(postFiles)
        postFiles.forEach(file =>{
            if(!beforeUpload){
                post(file)
            } else{
                const result = beforeUpload(file)
                if(result && result instanceof Promise){
                    result.then(proFile =>{
                        post(proFile)
                    })
                }else if ( result ){
                    post(file)
                }
            }   
        })
    }

    const handleClick = (e:React.MouseEvent) =>{
        if(inputRef.current){
            inputRef.current.click()
        }
       
    }

    const handleRemove = (item:UploadFile)=>{
        console.log(item)
        setFileList(fileList.filter(fi =>{
            return fi.uid !== item.uid
        }))
    }
    

    return (
        <div className="cainiao-upload">
            <Button btnType={ButtonType.Primary} onClick={handleClick}>Upload</Button>
            <input type="file" onChange={handleChange} ref={inputRef} style={{display:"none"}} accept="image/jpg"/>
            <UploadList fileList={fileList} removeItem={handleRemove}/>
        </div>
    )
}


export default Upload