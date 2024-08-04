import { Marker, Popup } from "react-leaflet"
import { useLeafLetCenter } from "../hooks"

const [lat, lng] = [51.505, -0.09]


export const MapContent = () => {
    const metadata = useLeafLetCenter({ lat, lng, zoom: 13 })

    return (
        <>
            <div id="metadata">
                <p> LAT: {metadata.lat} | LNG: {metadata.lng} | Zoom: {metadata.zoom}</p>
            </div>
            <Marker position={{ lat, lng }}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </>
    )
}
