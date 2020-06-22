import React, { useRef, useState } from 'react'
import { UploadFile } from './upload'
import Icon from '../Icon/icon'

interface UploadListProps {
    fileList: UploadFile[],
    removeItem:(item:UploadFile)=> void
}



const UploadList: React.FC<UploadListProps> = props => {
    const [hover, setHover] = useState(false)
    const { fileList ,removeItem} = props
    const handleClick = (item:UploadFile)=>{
        removeItem(item)    
    }
    return (
        <ul className="cainiao-upload-list">
            {
                fileList.map(item => {
                    return (
                        <>
                            <li key={item.uid} className={`upload-item file-${item.status}`}>
                                <span className={`file-${item.status}`}>
                                    <Icon icon="file-alt" className="file-alt"/>
                                    {item.name}
                                </span>
                                <span className="file-status" >

                                    {item.status === 'uploading' && <Icon icon="spinner" spin color="#0d6efd" />}
                                    {item.status === 'sucess' && <Icon icon="check-circle" />}
                                    {item.status === 'error' && <Icon icon="times-circle" />}
                                </span>
                                <span className="file-actions">
                                    <Icon icon="times-circle" onClick={()=>{handleClick(item)}}/>
                                </span>

                            </li>
                            {
                                item.percent === 0 || item.percent === 100 ?
                                    null :
                                    <div className="progess">
                                        <div className="outer">
                                            <div className="inner" style={{ width: `${item.percent}%` }}>
                                                
                                            </div>
                                        </div>
                                        <span className="percent">{item.percent}%</span>
                                    </div>
                            }
                        </>
                    )
                })
            }
        </ul>
    )
}

export default UploadList