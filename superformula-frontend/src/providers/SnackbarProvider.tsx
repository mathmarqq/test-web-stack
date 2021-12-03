import React, { ReactElement, ReactNode, useCallback, useState } from 'react'
import SnackbarContext from '../contexts/SnackbarContext'

type SnackbarProviderProps = {
    children: ReactNode
}

// 1171

const SnackbarProvider = ({ children }: SnackbarProviderProps): ReactElement => {
    const [snackbar, setSnackbar] = useState<{ message: string; type: 'error' | 'success' } | null>(
        null
    )

    const showSnackbar = useCallback(function showSnackbar(
        message: string,
        type: 'error' | 'success'
    ) {
        setSnackbar({ message, type })
    },
    [])

    const value = React.useMemo(
        () => ({
            snackbar,
            showSnackbar,
        }),
        [showSnackbar, snackbar]
    )

    return <SnackbarContext.Provider value={value}>{children}</SnackbarContext.Provider>
}

export default SnackbarProvider
