import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "./context"
import { router } from "./router/router"

export const ChatApp = () => {
    return (
        <>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </>
    )
}
