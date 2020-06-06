import React from 'react'
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
}

//export type AlertType = 'sucess' | 'danger' | 'default' | 'warning'


const Alert: React.FC<BaseAlertProps> = (props) => {
    const {
        message,
        closable,
        type,
        title,
        className,
        
    } = props

    const classes = classNames(
        'alt', className, {
        [`alt-${type}`]: type,
    }
    )
    
    if (closable) {
        if (title) {
            return (
                <div className={classes}>
                    <h5>{title}<span className="close">关闭</span></h5>
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

}

export default Alert