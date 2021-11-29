import React from 'react'
import { ApolloProvider as Provider } from '@apollo/client'
import { graphqlClient } from '../infra/clients/ApolloClient'

type ApolloProviderProps = {
    children: string
}

function ApolloProvider({ children }: ApolloProviderProps) {
    return <Provider client={graphqlClient}>{children}</Provider>
}

export default ApolloProvider
