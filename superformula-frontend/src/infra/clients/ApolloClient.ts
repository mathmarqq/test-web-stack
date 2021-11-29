import { ApolloClient, InMemoryCache } from '@apollo/client'

const graphqlClient = new ApolloClient({
    uri: 'http://localhost:9002/graphql',
    cache: new InMemoryCache(),
})

export { graphqlClient }
