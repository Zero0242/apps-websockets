import React from 'react'
import { Popup } from "react-leaflet"
import { useLeafLetCenter, useWSMarkers } from "../hooks"
import { DraggableMarker } from "./DraggableMarker"

const [lat, lng] = [51.505, -0.09]

export const MapContent = () => {
    const { markers, updateMarker } = useWSMarkers([])

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
