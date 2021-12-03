import React, { ReactElement } from 'react'
import UserCard from 'domains/users/components/UserCard/UserCard'
import Loader from 'components/Loader/Loader'
import { User } from 'domains/users/models/User'
import styles from './UserGrid.module.scss'

type UserGridProps = {
    users: User[]
    loading: boolean
    onEdit: () => void
}

function UserGrid({ users, loading, onEdit }: UserGridProps): ReactElement {
    function renderContent() {
        let content: JSX.Element

        if (loading) {
            content = (
                <div className={styles.loadingWrapper}>
                    <Loader />
                </div>
            )
        } else if (users.length) {
            content = (
                <div className={styles.cardsWrapper}>
                    {users.map((user) => (
                        <UserCard
                            key={user.id}
                            user={{
                                ...user,
                                imgUrl: `https://source.unsplash.com/random/192x192?sig=${user?.id}`,
                            }}
                            onEdit={() => onEdit()}
                        />
                    ))}
                </div>
            )
        } else {
            content = (
                <div className={styles.notFound}>
                    <span>We cannot find users :(</span>
                </div>
            )
        }

        return content
    }

    return renderContent()
}

export default UserGrid
export type { UserGridProps }
