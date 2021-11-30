import React, { ReactElement } from 'react'
import styles from '../styles/themes.module.scss'
import Routes from './Routes'
import Providers from '../providers/Providers'

function App(): ReactElement {
    return (
        <div className={styles.defaultTheme}>
            <Providers>
                <Routes />
            </Providers>
        </div>
    )
}

export default App
