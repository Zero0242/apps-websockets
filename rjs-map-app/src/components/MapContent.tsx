import { Marker, Popup } from "react-leaflet"

const [lat, lng] = [51.505, -0.09]

export const MapContent = () => {
    return (
        <>
            <Marker position={{ lat, lng }}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </>
    )
}
