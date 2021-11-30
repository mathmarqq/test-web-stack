import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import { ModalProps } from './Modal.types'
import globalStyles from '../../styles/themes.module.scss'
import styles from './Modal.module.scss'

function Modal({
    children,
    backgroundClassName,
    className,
    isShowing,
}: ModalProps): ReactElement | null {
    const getModalWrapper = () => (
        <div className={`${globalStyles.defaultTheme} ${styles.background} ${backgroundClassName}`}>
            <div className={className}>{children}</div>
        </div>
    )

    return isShowing ? ReactDOM.createPortal(getModalWrapper(), document.body) : null
}

export default Modal
