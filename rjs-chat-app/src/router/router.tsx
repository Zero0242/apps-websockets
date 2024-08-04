import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout, ChatLayout, Root } from "../layouts";
import { ChatPage, LoginPage, RegisterPage } from "../pages";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <Navigate to='/auth/login' />
            },
            {
                path: 'chat',
                element: <ChatLayout />,
                children: [
                    {
                        index: true,
                        element: <ChatPage />
                    }
                ]
            },
            {
                path: 'auth',
                element: <AuthLayout />,
                children: [

                    {
                        path: 'login',
                        element: <LoginPage />
                    },
                    {
                        path: 'registro',
                        element: <RegisterPage />
                    },
                ]
            },


        ]
    }
])