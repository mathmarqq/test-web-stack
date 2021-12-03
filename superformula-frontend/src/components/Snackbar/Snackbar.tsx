import React, { ReactElement, useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import globalStyles from 'styles/themes.module.scss'
import styles from './Snackbar.module.scss'
import SnackbarContext from '../../contexts/SnackbarContext'

function Snackbar(): ReactElement | null {
    const { snackbar } = useContext(SnackbarContext)
    const [isShowing, setIsShowing] = useState(false)

    useEffect(() => {
        let timeout: NodeJS.Timeout | null

        if (snackbar) {
            setIsShowing(true)
            timeout = setTimeout(() => setIsShowing(false), 2000)
        }
        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [snackbar])

    function getStyle() {
        return snackbar?.type === 'error' ? styles.error : styles.success
    }

    function getSnackbarComponent() {
        return (
            <div
                data-testid="snackbar"
                className={`${globalStyles.defaultTheme} ${styles.snackbar} ${getStyle()}`}
            >
                <span>{snackbar?.message}</span>
            </div>
        )
    }

    return isShowing ? ReactDOM.createPortal(getSnackbarComponent(), document.body) : null
}

export default Snackbar
