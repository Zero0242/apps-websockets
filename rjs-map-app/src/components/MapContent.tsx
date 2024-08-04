import { Marker, Popup } from "react-leaflet"
import { useLeafLetCenter } from "../hooks"
import { useLeafletMarkers } from '../hooks/useLeafletMarkers'

const [lat, lng] = [51.505, -0.09]

export const MapContent = () => {
    const metadata = useLeafLetCenter({ lat, lng, zoom: 13 })
    const { markers } = useLeafletMarkers([])

    return (
        <>
            <div id="metadata">
                <p> LAT: {metadata.lat} | LNG: {metadata.lng} | Zoom: {metadata.zoom}</p>
            </div>
            {
                markers.map(({ id, lat, lng }) => (
                    <Marker position={{ lat, lng }} key={id}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                ))
            }
        </>
    )
}
