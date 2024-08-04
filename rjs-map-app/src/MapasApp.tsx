import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

const [lat, lng] = [51.505, -0.09]

export const MapasApp = () => {
    return (
        <MapContainer center={{ lat, lng }} zoom={13} scrollWheelZoom={false} id="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={{ lat, lng }}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}
