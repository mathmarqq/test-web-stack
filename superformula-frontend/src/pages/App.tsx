import React, { ReactElement } from 'react'
import Snackbar from 'components/Snackbar/Snackbar'
import styles from '../styles/index.module.scss'
import Routes from './Routes'
import Providers from '../providers/Providers'

function App(): ReactElement {
    return (
        <div className={styles.defaultTheme}>
            <Providers>
                <Routes />
                <Snackbar />
            </Providers>
        </div>
    )
}

export default App
