import React, { ReactElement, ReactNode } from 'react'
import ApolloProvider from './ApolloProvider'
import SnackbarProvider from './SnackbarProvider'

type ProvidersProps = {
    children: ReactNode
}

function Providers({ children }: ProvidersProps): ReactElement {
    return (
        <ApolloProvider>
            <SnackbarProvider>{children}</SnackbarProvider>
        </ApolloProvider>
    )
}

export default Providers
