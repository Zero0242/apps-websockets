import { useState } from 'react'
import { useMapEvent } from 'react-leaflet'
import { v4 as uuid } from 'uuid'
import { Marcador } from '../interfaces'

export const useLeafletMarkers = (initialMarkers: Marcador[]) => {
    const [markers, setMarkers] = useState<Marcador[]>(initialMarkers)
    useMapEvent('click', (e) => {
        const { lat, lng } = e.latlng
        addMarker(lat, lng)

    })
    const addMarker = (lat: number, lng: number) => {
        const nuevo = { id: uuid(), lat, lng } satisfies Marcador
        setMarkers(current => [...current, nuevo])
    }


    return { markers, addMarker }
}
