import Avatar from 'components/Avatar/Avatar'
import Card from 'components/Card/Card'
import PenIcon from 'components/Icons/PenIcon'
import React, { ReactElement, useState } from 'react'
import EditModal from 'domains/users/components/EditModal/EditModal'
import { formatDate } from 'utils/dateHelper'
import { User } from 'domains/users/models/User'
import styles from './UserCard.module.scss'

type UserCardProps = {
    user: User
    onEdit: () => void
}

function UserCard({ user, onEdit }: UserCardProps): ReactElement {
    const { name, imgUrl, description, createdAt } = user
    const [isShowingModal, setIsShowingModal] = useState(false)

    function onSave() {
        setIsShowingModal(false)
        onEdit()
    }

    return (
        <>
            <Card className={styles.card}>
                <div className={styles.actionButtons}>
                    <button
                        className={`${styles.hoveredElement} ${styles.editButton}`}
                        type="button"
                        onClick={() => setIsShowingModal(true)}
                        title="Edit User"
                        aria-label="Edit User"
                    >
                        <span className={styles.hideInformation}>Edit</span>
                        <PenIcon className={`${styles.editIcon}`} aria-hidden="true" />
                    </button>
                </div>
                <Avatar imgUrl={imgUrl || ''} imgAlt={name} className={styles.avatar} />
                <div className={styles.titleSection}>
                    <h2>{name.toUpperCase()}</h2>
                    <span className={styles.hoveredElement}>
                        created <span className={styles.date}>{formatDate(createdAt)}</span>
                    </span>
                </div>
                <p className={styles.description}>{description}</p>
            </Card>
            {isShowingModal ? (
                <EditModal
                    user={user}
                    onSave={() => onSave()}
                    onClose={() => setIsShowingModal(false)}
                />
            ) : null}
        </>
    )
}

export default UserCard
export type { UserCardProps }
