import React, { ReactElement } from 'react'
import { ButtonProps } from './Button.types'
import styles from './Button.module.scss'

function Button({ children, ...props }: ButtonProps): ReactElement {
    const getStyle = (): string => {
        return props.variant === 'primary' ? styles.primaryButton : styles.secondaryButton
    }

    return (
        <button className={`${getStyle()} ${styles.button}`} {...props}>
            {children}
        </button>
    )
}

export default Button
