import { RouterProvider } from "react-router-dom"
import { AuthProvider, ChatProvider, SocketProvider } from "./context"
import { router } from "./router/router"

export const ChatApp = () => {
    return (
        <>
            <AuthProvider>
                <ChatProvider>
                    <SocketProvider>
                        <RouterProvider router={router} />
                    </SocketProvider>
                </ChatProvider>
            </AuthProvider>
        </>
    )
}
