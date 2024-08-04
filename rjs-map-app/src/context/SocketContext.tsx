import { createContext, useEffect } from "react";
import type { Socket } from "socket.io-client";
import { useSocket } from "../hooks";

interface ContextProps {
    socket: Socket | undefined
    online: boolean
}

export const SocketContext = createContext({} as ContextProps)


export const SocketProvider = ({ children }: any) => {
    const { socket, online, conectar } = useSocket('http://localhost:3000')
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
