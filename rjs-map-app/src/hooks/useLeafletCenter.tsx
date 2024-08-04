
import { useCallback, useState } from "react"
import { useMapEvent } from "react-leaflet"
interface MapMetaData {
    lat: number
    lng: number
    zoom: number
}
export const useLeafLetCenter = (initialValues: MapMetaData): MapMetaData => {
    const [metadata, setMetadata] = useState<MapMetaData>(initialValues)
    const moveEvent = useMapEvent('move', () => {
        setCenter()
    })

    const setCenter = useCallback(() => {
        let { lat, lng } = moveEvent.getCenter()
        const zoom = moveEvent.getZoom()
        setMetadata({ lat, lng, zoom })
    }, [])

    return {
        lat: Number(metadata.lat.toFixed(5)),
        lng: Number(metadata.lng.toFixed(5)),
        zoom: metadata.zoom
    } satisfies MapMetaData
}
