import { MapContainer, TileLayer } from "react-leaflet"
import { MapContent } from "../components"

const [lat, lng] = [51.505, -0.09]

export const MapasPage = () => {
    return (
        <MapContainer center={{ lat, lng }} zoom={13} scrollWheelZoom={false} id="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapContent />
        </MapContainer>
    )
}