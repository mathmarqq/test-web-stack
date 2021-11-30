import React, { ReactElement } from 'react'
import { UserCardProps } from './UserCard.types'
import Avatar from '../../../components/Avatar/Avatar'
import Card from '../../../components/Card/Card'
import styles from './UserCard.module.scss'
import { formatDate } from '../../../utils/dateHelper'
import PenIcon from '../../../components/Icons/PenIcon'

function UserCard(user: UserCardProps): ReactElement {
    const { name, imgUrl, description, createdAt } = user

    return (
        <Card className={styles.card}>
            <div className={styles.actionButtons}>
                <PenIcon className={styles.editIcon} />
            </div>
            <Avatar imgUrl={imgUrl} imgAlt={name} className={styles.avatar} />
            <div className={styles.titleSection}>
                <h2 className={styles.title}>{name.toUpperCase()}</h2>
                <span className={styles.dateInformation}>
                    created <span className={styles.date}>{formatDate(createdAt)}</span>
                </span>
            </div>
            <p className={styles.description}>{description}</p>
        </Card>
    )
}

export default UserCard
