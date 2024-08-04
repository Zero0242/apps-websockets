import { RouterProvider } from "react-router-dom"
import { AuthProvider, SocketProvider } from "./context"
import { router } from "./router/router"

export const ChatApp = () => {
    return (
        <>
            <AuthProvider>
                <SocketProvider>
                    <RouterProvider router={router} />
                </SocketProvider>
            </AuthProvider>
        </>
    )
}
