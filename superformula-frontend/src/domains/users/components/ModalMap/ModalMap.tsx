import React, { ReactElement } from 'react'
import Map from 'components/Map/Map'
import Loader from 'components/Loader/Loader'
import styles from './ModalMap.module.scss'

type ModalMapProps = {
    loading: boolean
    center: { latitude: number; longitude: number }
}

function ModalMap({ loading, center }: ModalMapProps): ReactElement {
    function renderMapContainer() {
        let content: JSX.Element

        if (loading) {
            content = (
                <div className={styles.loadWrapper}>
                    <Loader />
                </div>
            )
        } else if (center.latitude && center.longitude) {
            content = (
                <Map
                    className={styles.map}
                    center={{
                        lat: center.latitude,
                        lng: center.longitude,
                    }}
                />
            )
        } else {
            content = (
                <div className={styles.wrongAdressWrapper}>
                    <span>We cannot find your address :(</span>
                </div>
            )
        }

        return content
    }

    return renderMapContainer()
}

export default ModalMap
export type { ModalMapProps }
