import { createContext, useContext, useEffect } from "react";
import type { Socket } from "socket.io-client";
import { getEnvs } from "../core/helpers";
import { useSocket } from "../hooks";
import { AuthContext } from "./AuthContext";

interface ContextProps {
    online: boolean
    socket: Socket | undefined
}

export const SocketContext = createContext({} as ContextProps)

export const SocketProvider = ({ children }: any) => {
    const { online, socket, conectar, desconectar } = useSocket(getEnvs().API_URL)
    const { status } = useContext(AuthContext)

    useEffect(() => {
        if (status === 'connected') {
            conectar()
        } else {
            desconectar()
        }
    }, [status])



    return (
        <SocketContext.Provider value={{ online, socket }}>
            {children}
        </SocketContext.Provider>
    )
}


