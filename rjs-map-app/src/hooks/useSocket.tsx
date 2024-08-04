import { useCallback, useEffect, useState } from 'react'
import type { Socket } from 'socket.io-client'
import * as io from 'socket.io-client'

export const useSocket = (path: string) => {
    /* const socket = useMemo(() => io(path), [path]) */
    const [socket, setSocket] = useState<Socket | undefined>()
    const [online, setOnline] = useState(false)

    const conectar = useCallback(() => {
        const client = io.connect(path, {
            transports: ['websocket'],
            forceNew: true,
            autoConnect: true,
            auth: {
                ['ws-token']: localStorage.getItem('authToken')
            }
        })
        setSocket(client)
    }, [path])

    const desconectar = useCallback(() => {
        socket?.disconnect()
    }, [socket])

    useEffect(() => {
        socket?.on('connected', () => {
            setOnline(true)
        })
    }, [socket])

    useEffect(() => {
        socket?.on('disconnected', () => {
            setOnline(false)
        })
    }, [socket])




    return { socket, online, conectar, desconectar }
}