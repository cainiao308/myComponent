import React, { createContext  , useState} from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon , FontAwesomeIconProps} from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'sucess' | 'info' | 'warning' |'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps  {
    theme?: ThemeProps,

}

const Icon: React.FC<FontAwesomeIconProps> = (props) =>{
    const {theme , className , ...restProps} = props

    const classes = classNames('cainiao-icon' , className , {
        [`icon-${theme}`]:theme
    })

    return (
        <FontAwesomeIcon className={classes} {...restProps} />
    )
}

export default Icon