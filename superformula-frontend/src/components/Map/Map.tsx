import React, { ReactElement, useEffect, useRef } from 'react'
import mapboxgl, { LngLatLike } from 'mapbox-gl'
import styles from './Map.module.scss'

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_ACCESS_KEY as string

type MapProps = {
    center: Extract<LngLatLike, [number, number]>
    // eslint-disable-next-line react/require-default-props
    className?: string
}

function Map({ center, className }: MapProps): ReactElement {
    const mapContainer = useRef<HTMLDivElement | null>(null)
    const map = useRef<mapboxgl.Map | null>(null)

    useEffect(() => {
        if (!map.current && mapContainer.current) {
            const defaultZoom = 16

            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center,
                zoom: defaultZoom,
            })

            new mapboxgl.Marker().setLngLat(center).addTo(map.current)
        }

        return () => map.current?.remove()
    })

    useEffect(() => {
        if (map.current) {
            map.current?.setCenter(center)
            new mapboxgl.Marker().setLngLat(center).addTo(map.current)
        }
    }, [center])

    return <div ref={mapContainer} className={`${styles.map} ${className}`} />
}

export default Map
