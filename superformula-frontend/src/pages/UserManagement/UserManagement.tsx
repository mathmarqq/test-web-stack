import React, { ReactElement, useState } from 'react'
import UserCard from '../../userManagement/components/UserCard/UserCard'
import Input from '../../components/Input/Input'
import styles from './UserManagement.module.scss'
import Button from '../../components/Button/Button'
import useQueryParams, { QueryParam } from '../../hooks/useQueryParams'
import Loader from '../../components/Loader/Loader'
import useListUsers from '../../hooks/useListUsers'
import { getIntegerQueryParam } from '../../utils/queryHelper'

const image =
    'https://media.istockphoto.com/photos/funny-west-highland-white-terrier-dog-decorated-with-photo-props-sits-picture-id1292884801'

const PAGE_LIMIT = 6

function UserManagement(): ReactElement {
    const { changeQueryParams, getQueryParams } = useQueryParams()
    const queryPage = getIntegerQueryParam(getQueryParams(), 'page')

    const [search, setSearch] = useState('')

    const { data, fetchMoreUsers, refetchUsers, isFetching, isFetchingMore } = useListUsers({
        page: queryPage,
        limit: PAGE_LIMIT,
    })

    function fetchSearchedUsers(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
        changeQueryParams('/user-management', [])
        refetchUsers(event.target.value)
    }

    function fetchNextPage() {
        const nextPageNumber = queryPage + 1
        const nextQueryParams: QueryParam[] = [{ key: 'page', value: `${nextPageNumber}` }]

        changeQueryParams('/user-management', nextQueryParams)
        fetchMoreUsers()
    }

    function renderContent() {
        return isFetching() ? (
            <Loader />
        ) : (
            data?.listUsers?.items.map((user) => (
                <UserCard
                    key={user.id}
                    user={{ ...user, imgUrl: image }}
                    onEdit={() => refetchUsers(search)}
                />
            ))
        )
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Users list</h1>
                    <Input
                        value={search}
                        onChange={(event) => fetchSearchedUsers(event)}
                        placeholder="Search..."
                    />
                </div>
                <div className={isFetching() ? styles.loadingWrapper : styles.cardsWrapper}>
                    {renderContent()}
                </div>
                <div className={styles.loadMoreWrapper}>
                    {isFetchingMore() ? (
                        <Loader />
                    ) : (
                        <Button
                            variant="primary"
                            onClick={() => fetchNextPage()}
                            disabled={
                                isFetching() ||
                                isFetchingMore() ||
                                data?.listUsers?.nextToken === null
                            }
                        >
                            Load More
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserManagement
