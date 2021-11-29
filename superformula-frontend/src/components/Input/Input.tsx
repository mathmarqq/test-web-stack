import React, { ReactElement } from 'react'
import { InputProps } from './Input.types'
import styles from './Input.module.scss'

function Input({ className, ...props }: InputProps): ReactElement {
    return <input className={`${styles.input} ${className}`} {...props} />
}

export default Input
