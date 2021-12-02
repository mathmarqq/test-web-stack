import React, { ReactElement } from 'react'
import styles from './TextField.module.scss'
import Input, { InputProps } from '../Input/Input'

type TextFieldProps = {
    label: string
    inputId: string
} & InputProps

function TextField({ label, inputId, ...props }: TextFieldProps): ReactElement {
    return (
        <>
            <label className={styles.label} htmlFor={inputId}>
                {label}
            </label>
            <Input type="text" className={styles.input} id={inputId} {...props} />
        </>
    )
}

export default TextField
export type { TextFieldProps }
