import React, { ReactElement, useEffect, useState } from 'react'
import { NetworkStatus, useQuery } from '@apollo/client'
import {
    findUsers as findUsersQuery,
    FindUsersResponse,
    FindUsersVars,
} from '../../infra/graphql/queries'
import UserCard from '../../userManagement/components/UserCard/UserCard'
import Input from '../../components/Input/Input'
import styles from './UserManagement.module.scss'
import Button from '../../components/Button/Button'
import useQueryParams, { QueryParam } from '../../hooks/useQueryParams'
import Loader from '../../components/Loader/Loader'

const image =
    'https://media.istockphoto.com/photos/funny-west-highland-white-terrier-dog-decorated-with-photo-props-sits-picture-id1292884801'

const PAGE_LIMIT = 6
const INITIAL_PAGE = 0

function getQueryPage(searchParams: URLSearchParams | undefined) {
    return { queryPage: parseInt(searchParams?.get('page') || `${INITIAL_PAGE}`, 10) }
}

function UserManagement(): ReactElement {
    const { changeQueryParams, getQueryParams } = useQueryParams()
    const { queryPage } = getQueryPage(getQueryParams())

    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')

    const [nextPage, setNextPage] = useState(INITIAL_PAGE)

    const { loading, data, networkStatus, fetchMore, refetch } = useQuery<
        FindUsersResponse,
        FindUsersVars
    >(findUsersQuery, {
        variables: {
            search: debouncedSearch,
            limit: PAGE_LIMIT + PAGE_LIMIT * queryPage,
        },
        notifyOnNetworkStatusChange: true,
    })

    useEffect(() => {
        setTimeout(() => {
            setDebouncedSearch(search)
        }, 1000)
    }, [search])

    useEffect(() => {
        refetch({
            search: debouncedSearch,
        })
    }, [debouncedSearch, refetch])

    useEffect(() => {
        if (nextPage !== INITIAL_PAGE) {
            fetchMore({
                variables: {
                    page: nextPage,
                    limit: PAGE_LIMIT,
                },
            })
        }
    }, [nextPage, fetchMore])

    function searchUsers(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
        changeQueryParams('/user-management', [])
        setNextPage(INITIAL_PAGE)
    }

    async function fetchMoreUsers() {
        const nextPageNumber = queryPage + 1
        const nextQueryParams: QueryParam[] = [{ key: 'page', value: `${nextPageNumber}` }]

        changeQueryParams('/user-management', nextQueryParams)
        setNextPage(nextPageNumber)
    }

    function isFetching() {
        return loading && networkStatus !== NetworkStatus.fetchMore
    }

    function isFetchingMore() {
        return loading && networkStatus === NetworkStatus.fetchMore
    }

    function handleUpdateUser() {
        refetch()
    }

    function renderContent() {
        return isFetching() ? (
            <Loader />
        ) : (
            data?.findUsers.items.map((user) => (
                <UserCard
                    key={user.id}
                    user={{ ...user, imgUrl: image }}
                    onEdit={() => handleUpdateUser()}
                />
            ))
        )
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Users list</h1>
                <Input
                    value={search}
                    onChange={(event) => searchUsers(event)}
                    placeholder="Search..."
                    disabled={loading}
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
                        onClick={() => fetchMoreUsers()}
                        disabled={
                            loading || data?.findUsers.items.length === data?.findUsers.totalItems
                        }
                    >
                        Load More
                    </Button>
                )}
            </div>
        </div>
    )
}

export default UserManagement
