import { useMemo, useRef } from "react"
import { Marker } from "react-leaflet"

type LatLng = { lat: number, lng: number }

interface Props {
    children: React.ReactNode
    position: LatLng
    onDrag: (position: LatLng) => void
}

export function DraggableMarker({ children, position, onDrag }: Props) {

    const markerRef = useRef<any>(null)
    const eventHandlers = useMemo(() => ({
        dragend() {
            const marker = markerRef.current
            if (marker != null) {
                const event = marker.getLatLng()
                onDrag(event)
            }
        },
    }), [])

    return (
        <Marker
            draggable
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
            {children}
        </Marker>
    )
}