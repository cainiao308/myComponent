import React , {useState , FC ,MouseEvent} from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
//  <Alert
//  message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
//  type="warning"
//  closable
//  onClose={onClose}
// />

export enum AlertType {
    Sucess = 'success',
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
    onClose:(e:MouseEvent)=>void
}

//export type AlertType = 'sucess' | 'danger' | 'default' | 'warning'


export const Alert: FC<BaseAlertProps> = (props) => {
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

    const handleClick = (e:MouseEvent)=>{
        setVisible(false)
        console.log(visible)
        onClose(e)
    }
    if(visible){
        if (closable) {
            if (title) {
                return (
                    <div className={classes}>
                        <h5>{title}<span className="close" onClick={handleClick}><Icon icon="times" /></span></h5>
                        <p>{message}</p>
                    </div>
                )
            } else {
                return (
                    <div className={classes}>{message}<span className="close"><Icon icon="times" /></span></div>
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

export default Alert;