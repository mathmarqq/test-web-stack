import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import { ModalProps } from './Modal.types'
import styles from '../../styles/themes.module.scss'

function Modal({ children, className, isShowing }: ModalProps): ReactElement | null {
    const getModalWrapper = () => (
        <div className={styles.defaultTheme}>
            <div className={className}>{children}</div>
        </div>
    )

    return isShowing ? ReactDOM.createPortal(getModalWrapper(), document.body) : null
}

export default Modal
