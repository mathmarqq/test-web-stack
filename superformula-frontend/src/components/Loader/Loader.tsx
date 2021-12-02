import React, { ReactElement } from 'react'
import styles from './Loader.module.scss'

type LoaderProps = {
    className?: string
}

function Loader({ className }: LoaderProps): ReactElement {
    return <div data-testid="loader" className={`${styles.loader} ${className}`} />
}

Loader.defaultProps = {
    className: '',
}

export default Loader
export type { LoaderProps }
