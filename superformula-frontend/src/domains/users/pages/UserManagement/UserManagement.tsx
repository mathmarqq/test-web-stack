import React, { ReactElement, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import useQueryParams, { QueryParam } from 'hooks/useQueryParams'
import Loader from 'components/Loader/Loader'
import useListUsers from 'hooks/useListUsers'
import { getIntegerQueryParam } from 'utils/queryHelper'
import UserGrid from 'domains/users/components/UserGrid/UserGrid'
import { _debounce } from 'utils/utils'
import SnackbarContext from 'contexts/SnackbarContext'
import styles from './UserManagement.module.scss'

const PAGE_LIMIT = 6

function UserManagement(): ReactElement {
    const { showSnackbar } = useContext(SnackbarContext)

    const { changeQueryParams, getQueryParams } = useQueryParams()
    const queryPage = getIntegerQueryParam(getQueryParams(), 'page')

    const loadMoreRef = useRef<null | HTMLDivElement>(null)

    const [search, setSearch] = useState('')
    const [shouldScroll, setShouldScroll] = useState(true)
    const [isFetchingMore, setIsFetchingMore] = useState(false)

    const { data, fetchMoreUsers, refetchUsers, isFetching, error } = useListUsers({
        page: queryPage,
        limit: PAGE_LIMIT,
    })

    const debouncedRefetchUsers = useMemo(() => _debounce(refetchUsers, 1000), [refetchUsers])

    useEffect(() => {
        if (loadMoreRef.current && data && shouldScroll) {
            loadMoreRef.current.scrollIntoView({ behavior: 'smooth' })
            setShouldScroll(false)
        }
    }, [data, shouldScroll])

    useEffect(() => {
        if (error) {
            showSnackbar('Failed to fetch users', 'error')
        }
    }, [error, showSnackbar])

    async function fetchSearchedUsers(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
        changeQueryParams('/user-management', [])

        try {
            await debouncedRefetchUsers(event.target.value)
        } catch (err) {
            showSnackbar('Failed to fetch users', 'error')
        }
    }

    async function fetchNextPage() {
        const nextPageNumber = queryPage + 1
        const nextQueryParams: QueryParam[] = [{ key: 'page', value: `${nextPageNumber}` }]

        changeQueryParams('/user-management', nextQueryParams)
        try {
            setIsFetchingMore(true)
            await fetchMoreUsers()
            setIsFetchingMore(false)
        } catch (err) {
            setIsFetchingMore(false)
            showSnackbar('Failed to fetch users', 'error')
        }
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
                    {isFetchingMore ? (
                        <Loader />
                    ) : (
                        <Button
                            variant="primary"
                            onClick={() => fetchNextPage()}
                            disabled={
                                isFetching() ||
                                isFetchingMore ||
                                data?.listUsers?.nextToken === null ||
                                error != null
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
