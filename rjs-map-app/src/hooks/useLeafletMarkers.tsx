import { useRef, useState } from 'react'
import { useMapEvent } from 'react-leaflet'
import { Subject } from 'rxjs'
import { v4 as uuid } from 'uuid'
import type { Marcador } from '../interfaces'

export const useLeafletMarkers = (initialMarkers: Marcador[]) => {
    const [markers, setMarkers] = useState<Marcador[]>(initialMarkers)
    const moverMarcador = useRef(new Subject<Marcador>())
    const nuevoMarker = useRef(new Subject<Marcador>())

    useMapEvent('click', (e) => {
        const { lat, lng } = e.latlng
        addMarker(lat, lng)

    })

    const addMarker = (lat: number, lng: number) => {
        const nuevo = { id: uuid(), lat, lng } satisfies Marcador
        nuevoMarker.current.next(nuevo)
        setMarkers(current => [...current, nuevo])
    }

    const updateMarker = ({ id, lat, lng }: Marcador, originWS = false) => {
        setMarkers(current => current.map(e => {
            if (e.id !== id) return e;
            return { ...e, lat, lng } satisfies Marcador
        }))
        if (!originWS) moverMarcador.current.next({ id, lat, lng })
    }

    const regenerateMarkers = (nuevos: Marcador[]) => {
        setMarkers(nuevos)

    }


    return {
        // Valores
        markers,
        // Subscripciones
        nuevoMarker$: nuevoMarker.current,
        moverMarcador$: moverMarcador.current,
        // Metodos
        addMarker,
        updateMarker,
        regenerateMarkers,
    }
}
