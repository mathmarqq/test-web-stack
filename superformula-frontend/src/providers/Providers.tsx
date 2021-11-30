import React, { ReactElement, ReactNode } from 'react'
import ApolloProvider from './ApolloProvider'

type ProvidersProps = {
    children: ReactNode
}

function Providers({ children }: ProvidersProps): ReactElement {
    return <ApolloProvider>{children}</ApolloProvider>
}

export default Providers
