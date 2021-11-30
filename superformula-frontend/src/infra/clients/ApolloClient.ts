import { ApolloClient, InMemoryCache } from '@apollo/client'
import { FindUserType } from '../graphql/queries'

const mergeListUsersQuery = (existing: FindUserType, incoming: FindUserType) => {
    return {
        ...existing,
        ...incoming,
        items: (existing?.items ?? []).concat(incoming?.items ?? []),
    }
}

const graphqlClient = new ApolloClient({
    uri: 'http://localhost:3005/api/v1/graphql',
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    findUsers: { keyArgs: ['filter'], merge: mergeListUsersQuery },
                },
            },
        },
    }),
})

export { graphqlClient }
