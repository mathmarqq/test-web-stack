import React, { ButtonHTMLAttributes, ReactElement } from 'react'
import { themeVariant } from 'styles'
import styles from './Button.module.scss'

type ButtonProps = {
    variant: themeVariant
} & ButtonHTMLAttributes<HTMLButtonElement>

function Button({ children, className, ...props }: ButtonProps): ReactElement {
    const getStyle = (): string => {
        return props.variant === 'primary' ? styles.primaryButton : styles.secondaryButton
    }

    return (
        <button className={`${getStyle()} ${styles.button} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button
export type { ButtonProps }
