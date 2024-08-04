import { useState } from 'react'
import { useMapEvent } from 'react-leaflet'
import { v4 as uuid } from 'uuid'
import type { Marcador } from '../interfaces'

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

    const updateMarker = ({ id, lat, lng }: Marcador) => {
        setMarkers(current => current.map(e => {
            if (e.id === id) {
                return { ...e, lat, lng }
            }
            return e
        }))

    }


    return { markers, addMarker, updateMarker }
}
