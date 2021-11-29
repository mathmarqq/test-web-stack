import React, { ReactElement } from 'react'
import { TextFieldProps } from './TextField.types'
import styles from './TextField.module.scss'
import Input from '../Input/Input'

function TextField({ label, inputId, ...props }: TextFieldProps): ReactElement {
    return (
        <div className={styles.textField}>
            <label className={styles.label} htmlFor={inputId}>
                {label}
            </label>
            <Input className={styles.input} id={inputId} {...props} />
        </div>
    )
}

export default TextField
