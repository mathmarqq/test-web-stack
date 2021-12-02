import React, { ReactElement, useEffect, useRef } from 'react'
import mapboxgl, { LngLatLike } from 'mapbox-gl'
import styles from './Map.module.scss'

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_ACCESS_KEY as string

type MapProps = {
    center: Extract<LngLatLike, { lng: number; lat: number }>
    className?: string
}

function Map({ center, className }: MapProps): ReactElement {
    const mapElementWrapper = useRef<HTMLDivElement | null>(null)
    const map = useRef<mapboxgl.Map | null>(null)

    useEffect(() => {
        if (!map.current && mapElementWrapper.current) {
            const defaultZoom = 16

            map.current = new mapboxgl.Map({
                container: mapElementWrapper.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center,
                zoom: defaultZoom,
            })

            new mapboxgl.Marker().setLngLat(center).addTo(map.current)
        }
    })

    useEffect(() => {
        if (map.current) {
            map.current?.setCenter(center)
            new mapboxgl.Marker().setLngLat(center).addTo(map.current)
        }
    }, [center])

    return <div ref={mapElementWrapper} className={`${styles.map} ${className}`} />
}

Map.defaultProps = {
    className: '',
}

export default Map
export type { MapProps }
