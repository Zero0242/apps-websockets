
import { SocketProvider } from "./context"
import { MapasPage } from "./pages"


export const MapasApp = () => {
    return (
        <SocketProvider>
            <MapasPage />
        </SocketProvider>
    )
}
