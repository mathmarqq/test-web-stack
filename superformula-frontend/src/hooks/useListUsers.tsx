import { NetworkStatus, useQuery } from '@apollo/client'
import { useCallback, useState } from 'react'
import {
    listUsers as listUsersQuery,
    ListUsersResponse,
    ListUsersQueryVariables,
} from '../infra/graphql/queries'

type HookParams = { page: number; limit: number }

type HookResponse = {
    data: ListUsersResponse | undefined
    fetchMoreUsers: () => void
    refetchUsers: (search: string) => void
    isFetching: () => boolean
    isFetchingMore: () => boolean
}

function useListUsers({ page, limit }: HookParams): HookResponse {
    const [currentSearch, setCurrentSearch] = useState('')

    const { loading, data, networkStatus, fetchMore, refetch } = useQuery<
        ListUsersResponse,
        ListUsersQueryVariables
    >(listUsersQuery, {
        variables: {
            limit: limit + limit * page,
        },
        notifyOnNetworkStatusChange: true,
    })

    const fetchMoreUsers = useCallback(() => {
        fetchMore({
            variables: {
                filter: {
                    name: {
                        contains: currentSearch,
                    },
                },
                nextToken: data?.listUsers?.nextToken,
                limit,
            },
        })
    }, [currentSearch, data?.listUsers?.nextToken, fetchMore, limit])

    function refetchUsers(search: string) {
        setCurrentSearch(search)
        refetch({
            filter: {
                name: {
                    contains: search,
                },
            },
            nextToken: null,
            limit,
        })
    }

    function isFetching() {
        return loading && networkStatus !== NetworkStatus.fetchMore
    }

    function isFetchingMore() {
        return loading && networkStatus === NetworkStatus.fetchMore
    }

    return { data, fetchMoreUsers, refetchUsers, isFetching, isFetchingMore }
}

export default useListUsers
