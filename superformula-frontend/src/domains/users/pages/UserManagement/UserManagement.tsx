import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import useQueryParams, { QueryParam } from 'hooks/useQueryParams'
import Loader from 'components/Loader/Loader'
import useListUsers from 'hooks/useListUsers'
import { getIntegerQueryParam } from 'utils/queryHelper'
import UserGrid from 'domains/users/components/UserGrid/UserGrid'
import { _debounce } from 'utils/utils'
import styles from './UserManagement.module.scss'

const PAGE_LIMIT = 6

function UserManagement(): ReactElement {
    const { changeQueryParams, getQueryParams } = useQueryParams()
    const queryPage = getIntegerQueryParam(getQueryParams(), 'page')

    const loadMoreRef = useRef<null | HTMLDivElement>(null)

    const [search, setSearch] = useState('')

    const { data, fetchMoreUsers, refetchUsers, isFetching, isFetchingMore } = useListUsers({
        page: queryPage,
        limit: PAGE_LIMIT,
    })

    const debouncedRefetchUsers = useMemo(() => _debounce(refetchUsers, 1000), [refetchUsers])

    useEffect(() => {
        if (loadMoreRef.current) {
            loadMoreRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [])

    function fetchSearchedUsers(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
        changeQueryParams('/user-management', [])
        debouncedRefetchUsers(event.target.value)
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
                <UserGrid
                    users={data?.listUsers?.items || []}
                    loading={isFetching()}
                    onEdit={() => refetchUsers(search)}
                />
                <div ref={loadMoreRef} className={styles.loadMoreWrapper}>
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
