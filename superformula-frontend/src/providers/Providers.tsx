import React, { ReactElement } from 'react'
import ApolloProvider from './ApolloProvider'

type ProvidersProps = {
    children: string
}

function Providers({ children }: ProvidersProps): ReactElement {
    return <ApolloProvider>{children}</ApolloProvider>
}

export default Providers
