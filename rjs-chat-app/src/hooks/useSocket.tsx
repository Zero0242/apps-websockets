import { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'

export const useSocket = (path: string) => {
    const socket = useMemo(() => io(path), [path])
    const [online, setOnline] = useState(false)

    useEffect(() => {
        socket.on('connected', () => {
            setOnline(true)
        })
    }, [socket])

    useEffect(() => {
        socket.on('disconnected', () => {
            setOnline(false)
        })
    }, [socket])




    return { socket, online }
}
