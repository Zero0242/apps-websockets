import { createContext, useContext, useEffect } from "react";
import type { Socket } from "socket.io-client";
import { getEnvs, scrollToBottomAnimated } from "../core/helpers";
import type { Usuario } from "../core/interfaces";
import { useSocket } from "../hooks";
import { AuthContext } from "./AuthContext";
import { ChatContext } from "./chat/ChatContext";

interface ContextProps {
    online: boolean
    socket: Socket | undefined
}

export const SocketContext = createContext({} as ContextProps)

export const SocketProvider = ({ children }: any) => {
    const { online, socket, conectar, desconectar } = useSocket(getEnvs().API_URL)
    const { status } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    useEffect(() => {
        if (status === 'connected') {
            conectar()
        }
    }, [status, conectar])

    useEffect(() => {
        if (status !== 'connected') {
            desconectar()
        }
    }, [status, desconectar])

    useEffect(() => {
        socket?.on('chat:usuarios', (usuarios) => {
            dispatch({ type: 'set-usuarios', payload: usuarios as Usuario[] })
        })
    }, [socket, dispatch])
    useEffect(() => {
        socket?.on('chat:mensaje-personal', (mensaje) => {
            mensaje.createdAt = new Date(mensaje.createdAt)
            dispatch({ type: 'set-nuevo-mensaje', payload: mensaje })
            scrollToBottomAnimated('MessageList')
        })
    }, [socket, dispatch])





    return (
        <SocketContext.Provider value={{ online, socket }}>
            {children}
        </SocketContext.Provider>
    )
}


