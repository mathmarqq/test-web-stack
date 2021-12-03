import { ApolloQueryResult, NetworkStatus, useQuery } from '@apollo/client'
import { useCallback, useState } from 'react'
import {
    listUsers as listUsersQuery,
    ListUsersResponse,
    ListUsersQueryVariables,
} from '../infra/graphql/queries'

type HookParams = { page: number; limit: number }

type HookResponse = {
    data: ListUsersResponse | undefined
    fetchMoreUsers: () => Promise<ApolloQueryResult<ListUsersResponse>>
    refetchUsers: (search: string) => Promise<ApolloQueryResult<ListUsersResponse>>
    isFetching: () => boolean
    error: unknown
}

function useListUsers({ page, limit }: HookParams): HookResponse {
    const [currentSearch, setCurrentSearch] = useState('')

    const { loading, data, networkStatus, fetchMore, refetch, error } = useQuery<
        ListUsersResponse,
        ListUsersQueryVariables
    >(listUsersQuery, {
        variables: {
            limit: limit + limit * page,
        },
        notifyOnNetworkStatusChange: true,
    })

    const fetchMoreUsers = useCallback(() => {
        return fetchMore({
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

    const refetchUsers = useCallback(
        (search: string) => {
            setCurrentSearch(search)
            return refetch({
                filter: {
                    name: {
                        contains: search,
                    },
                },
                nextToken: null,
                limit,
            })
        },
        [limit, refetch]
    )

    function isFetching() {
        return loading && networkStatus !== NetworkStatus.fetchMore
    }

    return { data, fetchMoreUsers, refetchUsers, isFetching, error }
}

export default useListUsers
