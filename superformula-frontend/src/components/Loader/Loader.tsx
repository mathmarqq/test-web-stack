import React, { ReactElement } from 'react'
import { LoaderProps } from './Loader.types'
import styles from './Loader.module.scss'

function Loader({ className }: LoaderProps): ReactElement {
    return <div className={`${styles.loader} ${className}`} />
}

export default Loader
