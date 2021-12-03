import React, { ReactElement, ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import globalStyles from '../../styles/themes.module.scss'
import styles from './Modal.module.scss'

type ModalProps = {
    children: ReactNode
    backgroundClassName?: string
    className?: string
    onClose: () => void
}

function Modal({
    children,
    backgroundClassName,
    className,
    onClose,
}: ModalProps): ReactElement | null {
    useEffect(() => {
        function onClick(event: MouseEvent) {
            if (event.target === event.currentTarget) {
                onClose()
            }
        }
        document.getElementById('modal')?.addEventListener('click', onClick)

        return () => {
            document.getElementById('modal')?.addEventListener('click', onClick)
        }
    }, [onClose])

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose()
            }
        }
        document.addEventListener('keydown', onKeyDown)

        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [onClose])

    const getModalWrapper = () => (
        <div
            id="modal"
            className={`${globalStyles.defaultTheme} ${styles.background} ${backgroundClassName}`}
            role="dialog"
            aria-modal="true"
        >
            <div className={className} role="dialog">
                {children}
            </div>
        </div>
    )

    return ReactDOM.createPortal(getModalWrapper(), document.body)
}

export default Modal
export type { ModalProps }
