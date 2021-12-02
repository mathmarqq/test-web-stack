import React, { InputHTMLAttributes, ReactElement } from 'react'
import styles from './Input.module.scss'

type InputProps = InputHTMLAttributes<HTMLInputElement>

function Input({ className, ...props }: InputProps): ReactElement {
    return <input className={`${styles.input} ${className}`} {...props} />
}

export default Input
export type { InputProps }
