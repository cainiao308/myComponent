import React, { useRef  , useState} from 'react'
import {UploadFile} from './upload'
import Icon from '../Icon/icon'

interface UploadListProps {
    fileList:UploadFile[]
}



const UploadList:React.FC<UploadListProps> = props =>{
    const {fileList} = props
    return (
        <ul className="cainiao-upload-list">
            {
                fileList.map(item=>{
                    return (
                    <li key={item.uid} className="upload-item">
                        <span className={`file-${item.status}`}>
                            <Icon icon="file-alt" />
                            {item.name}{item.percent}
                        </span>
                        <span className="file-status">
                        {/* <Icon icon="heart-rate" /> */}
                        {item.status === 'uploading' && <Icon icon="spinner" spin/>}
                        {item.status === 'sucess' && <Icon icon="check-circle" />}
                        {item.status === 'error' && <Icon icon="times-circle" />}
                        </span>
                        
                    </li>
                    )
                })
            }
        </ul>
    )
}

export default UploadList