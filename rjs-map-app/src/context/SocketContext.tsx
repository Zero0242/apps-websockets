import { createContext, useEffect } from "react";
import type { Socket } from "socket.io-client";
import { useSocket } from "../hooks";
import { envs } from "../config";

interface ContextProps {
    socket: Socket | undefined
    online: boolean
}

export const SocketContext = createContext({} as ContextProps)


export const SocketProvider = ({ children }: any) => {
    const { socket, online, conectar } = useSocket(envs.SOCKET_HOST)
    useEffect(() => {
        if (!online) {
            conectar()
        }
    }, [online, conectar])


    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}
