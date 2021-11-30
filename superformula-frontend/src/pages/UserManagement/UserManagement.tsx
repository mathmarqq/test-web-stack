import React, { ReactElement, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import {
    findUsers as findUsersQuery,
    FindUsersResponse,
    FindUsersVars,
} from '../../infra/graphql/queries'
import UserCard from '../../userManagement/components/UserCard/UserCard'
import { UserCardProps } from '../../userManagement/components/UserCard/UserCard.types'
import Input from '../../components/Input/Input'
import styles from './UserManagement.module.scss'
import Button from '../../components/Button/Button'
import useQueryParams, { QueryParam } from '../../hooks/useQueryParams'

const image =
    'https://media.istockphoto.com/photos/funny-west-highland-white-terrier-dog-decorated-with-photo-props-sits-picture-id1292884801'

const PAGE_LIMIT = 6
const INITIAL_PAGE = 0

function getQueryPage(searchParams: URLSearchParams | undefined) {
    return { queryPage: parseInt(searchParams?.get('page') || `${INITIAL_PAGE}`, 10) }
}

type UserManagementFilters = FindUsersVars & { loadMore: boolean }

function UserManagement(): ReactElement {
    const { changeQueryParams, getQueryParams } = useQueryParams()
    const { queryPage } = getQueryPage(getQueryParams())

    const [filters, setFilters] = useState<UserManagementFilters>({
        limit: PAGE_LIMIT + PAGE_LIMIT * queryPage,
        loadMore: false,
    })

    const [searchInput, setSearchInput] = useState('')

    const [executeSearch, { loading, data, fetchMore }] = useLazyQuery<
        FindUsersResponse,
        FindUsersVars
    >(findUsersQuery)

    function fetchUsers() {
        const { search, page, limit, loadMore } = filters

        if (!loadMore) {
            executeSearch({
                variables: {
                    search,
                    page,
                    limit,
                },
            })
        }
    }

    useEffect(fetchUsers, [executeSearch, filters])

    function fetchNexPage() {
        const { search, page, limit, loadMore } = filters

        if (loadMore) {
            fetchMore({
                variables: {
                    search,
                    page,
                    limit,
                },
            })
        }
    }

    useEffect(fetchNexPage, [fetchMore, filters])

    function searchUsers(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchInput(event.target.value)

        setTimeout(() => {
            setFilters({
                ...filters,
                search: event.target.value,
                page: INITIAL_PAGE,
                limit: PAGE_LIMIT,
                loadMore: false,
            })
        }, 500)

        changeQueryParams('/user-management')
    }

    function fetchMoreUsers() {
        const nextPage = (filters?.page || 0) + 1

        setFilters({ ...filters, page: nextPage, limit: PAGE_LIMIT, loadMore: true })

        const nextQueryParams: QueryParam[] = [
            {
                key: 'page',
                value: `${nextPage}`,
            },
        ]

        changeQueryParams('/user-management', nextQueryParams)
    }

    function renderCards() {
        return data?.findUsers.items.map((user) => {
            const userCardProps: UserCardProps = { ...user, imgUrl: image }
            return <UserCard key={user.id} {...userCardProps} />
        })
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Users list</h1>
                <Input
                    value={searchInput}
                    onChange={(event) => searchUsers(event)}
                    placeholder="Search..."
                />
            </div>
            <div className={styles.cardsWrapper}>{loading ? 'loading' : renderCards()}</div>
            <Button
                className={styles.loadButton}
                variant="primary"
                onClick={() => fetchMoreUsers()}
            >
                Load More
            </Button>
        </div>
    )
}

export default UserManagement
