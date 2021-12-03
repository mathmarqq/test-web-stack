import React, { ReactElement, useState } from 'react'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import useQueryParams, { QueryParam } from 'hooks/useQueryParams'
import Loader from 'components/Loader/Loader'
import useListUsers from 'hooks/useListUsers'
import { getIntegerQueryParam } from 'utils/queryHelper'
import UserGrid from 'domains/users/components/UserGrid/UserGrid'
import styles from './UserManagement.module.scss'

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
                <UserGrid users={[]} loading={isFetching()} onEdit={() => refetchUsers(search)} />
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
