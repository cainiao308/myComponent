import React , {useState} from 'react'
import classNames from 'classnames'
//  <Alert
//  message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
//  type="warning"
//  closable
//  onClose={onClose}
// />

export enum AlertType {
    Sucess = 'primary',
    Default = 'default',
    Danger = 'danger',
    Warning = 'warning'

}

interface BaseAlertProps {
    className?: string;
    message?: string;
    closable?: boolean;
    type?: AlertType;
    title?: string;
    onClose:(e:React.MouseEvent)=>void
}

//export type AlertType = 'sucess' | 'danger' | 'default' | 'warning'


const Alert: React.FC<BaseAlertProps> = (props) => {
    const {
        message,
        closable,
        type,
        title,
        className,
        onClose
    } = props

    const [visible , setVisible] = useState(true)

    const classes = classNames(
        'alt', className, {
        [`alt-${type}`]: type,
    }
    )

    const handleClick = (e:React.MouseEvent)=>{
        setVisible(false)
        console.log(visible)
        onClose(e)
    }
    if(visible){
        if (closable) {
            if (title) {
                return (
                    <div className={classes}>
                        <h5>{title}<span className="close" onClick={handleClick}>关闭</span></h5>
                        <p>{message}</p>
                    </div>
                )
            } else {
                return (
                    <div className={classes}>{message}<span className="close">关闭</span></div>
                )
            }
        } else {
            return (
                <div className={classes}>{message}</div>
            )
        }
    }else{
        return null
    }
    

}

export default Alert