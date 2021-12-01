import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { FindUserType } from '../graphql/queries'

const { REACT_APP_API_URL, REACT_APP_X_API_KEY } = process.env

const graphqlLink = new HttpLink({
    uri: REACT_APP_API_URL,
    headers: {
        'X-API-KEY': REACT_APP_X_API_KEY,
    },
})

const mergeListUsersQuery = (existing: FindUserType, incoming: FindUserType) => {
    return {
        ...existing,
        ...incoming,
        items: (existing?.items ?? []).concat(incoming?.items ?? []),
    }
}

const graphqlClient = new ApolloClient({
    link: graphqlLink,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    listUsers: { keyArgs: false, merge: mergeListUsersQuery },
                },
            },
        },
    }),
})

export { graphqlClient }
