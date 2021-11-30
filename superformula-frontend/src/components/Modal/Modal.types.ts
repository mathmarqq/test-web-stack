import { ReactNode } from 'react'

type ModalProps = {
    children: ReactNode
    isShowing: boolean
    backgroundClassName?: string
    className?: string
}

export type { ModalProps }
