import React, { ReactElement, ReactNode } from 'react'
import { ApolloProvider as Provider } from '@apollo/client'
import { graphqlClient } from '../infra/clients/ApolloClient'

type ApolloProviderProps = {
    children: ReactNode
}

function ApolloProvider({ children }: ApolloProviderProps): ReactElement {
    return <Provider client={graphqlClient}>{children}</Provider>
}

export default ApolloProvider
