import React, { useContext, useEffect } from 'react'
import { Popup } from "react-leaflet"
import { SocketContext } from '../context'
import { MapEvent } from '../helpers'
import { useLeafLetCenter } from "../hooks"
import { useLeafletMarkers } from '../hooks/useLeafletMarkers'
import { Marcador } from '../interfaces'
import { DraggableMarker } from "./DraggableMarker"

const [lat, lng] = [51.505, -0.09]

export const MapContent = () => {
    const { markers, updateMarker, moverMarcador$, nuevoMarker$, regenerateMarkers } = useLeafletMarkers([])
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        socket?.on(MapEvent.listar, (marcadores: Record<string, Marcador>) => {
            const servermarkers = Object.values(marcadores)
            regenerateMarkers(servermarkers)
        })

        return () => {
            socket?.off(MapEvent.listar)
        }
    }, [socket])

    useEffect(() => {
        nuevoMarker$.subscribe(nuevo => {
            socket?.emit(MapEvent.crear, nuevo)
            console.log(nuevo);
        })
    }, [nuevoMarker$, socket])

    useEffect(() => {
        moverMarcador$.subscribe(movido => {
            socket?.emit(MapEvent.mover, movido)
        })
    }, [moverMarcador$, socket])



    return (
        <>
            <MetaData />
            {
                markers.map(({ id, lat, lng }) => (
                    <DraggableMarker position={{ lat, lng }} key={id} onDrag={event => {
                        updateMarker({ ...event, id })
                    }} >
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </DraggableMarker>
                ))
            }
        </>
    )
}

const MetaData = React.memo(() => {
    const metadata = useLeafLetCenter({ lat, lng, zoom: 13 })
    return (
        <div id="metadata">
            <p> LAT: {metadata.lat} | LNG: {metadata.lng} | Zoom: {metadata.zoom}</p>
        </div>
    )
})
