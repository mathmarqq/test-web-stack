import React, { ReactElement, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import globalStyles from '../../styles/themes.module.scss'
import styles from './Modal.module.scss'

type ModalProps = {
    children: ReactNode
    backgroundClassName?: string
    className?: string
}

function Modal({ children, backgroundClassName, className }: ModalProps): ReactElement | null {
    const getModalWrapper = () => (
        <div className={`${globalStyles.defaultTheme} ${styles.background} ${backgroundClassName}`}>
            <div className={className}>{children}</div>
        </div>
    )

    return ReactDOM.createPortal(getModalWrapper(), document.body)
}

export default Modal
export type { ModalProps }
