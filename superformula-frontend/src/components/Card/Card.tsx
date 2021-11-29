import React, { ReactElement } from 'react'
import { CardProps } from './Card.types'
import styles from './Card.module.scss'

function Card({ children }: CardProps): ReactElement {
    return <div className={styles.card}>{children}</div>
}

export default Card
