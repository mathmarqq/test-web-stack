import React, { ReactElement } from 'react'
import { UserCardProps } from './UserCard.types'
import Avatar from '../../../components/Avatar/Avatar'
import Card from '../../../components/Card/Card'
import styles from './UserCard.module.scss'
import { formatDate } from '../../../utils/dateHelper'

function UserCard(user: UserCardProps): ReactElement {
    const { name, imgUrl, description, creationDate } = user

    return (
        <Card className={styles.card}>
            <Avatar imgUrl={imgUrl} imgAlt={name} className={styles.avatar} />
            <div className={styles.titleSection}>
                <h2>{name.toUpperCase()}</h2>
                <span>
                    created <span className={styles.date}>{formatDate(creationDate)}</span>
                </span>
            </div>
            <p className={styles.description}>{description}</p>
        </Card>
    )
}

export default UserCard
