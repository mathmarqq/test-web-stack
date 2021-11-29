import React, { ReactElement } from 'react'
import styles from '../styles/themes.module.scss'
import Routes from './Routes'

function App(): ReactElement {
    return (
        <div className={styles.defaultTheme}>
            <Routes />
        </div>
    )
}

export default App
