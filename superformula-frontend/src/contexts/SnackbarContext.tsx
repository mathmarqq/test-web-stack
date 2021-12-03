import { createContext } from 'react'

type SnackbarContextType = {
    showSnackbar: (message: string, type: 'error' | 'success') => void
    snackbar: { message: string; type: 'error' | 'success' } | null
}

const SnackbarContext = createContext<SnackbarContextType>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    showSnackbar: (message: string, type: 'error' | 'success') => {},
    snackbar: null,
})

export default SnackbarContext
