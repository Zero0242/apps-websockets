import { useContext, useEffect } from 'react'
import { SocketContext } from '../context'
import { MapEvent } from '../helpers'
import type { Marcador } from '../interfaces'
import { useLeafletMarkers } from './useLeafletMarkers'

export const useWSMarkers = (initialMarkers: Marcador[]) => {
    const { markers, updateMarker, moverMarcador$, nuevoMarker$, regenerateMarkers, addMarker } = useLeafletMarkers(initialMarkers)
    const { socket } = useContext(SocketContext)

    // * Marcadores iniciales
    useEffect(() => {
        socket?.on(MapEvent.listar, (marcadores: Record<string, Marcador>) => {
            const servermarkers = Object.values(marcadores)
            regenerateMarkers(servermarkers)
        })

        return () => {
            socket?.off(MapEvent.listar)
        }
    }, [socket])

    // * Escuchar movimiento de `otros` usuarios
    useEffect(() => {
        socket?.on(MapEvent.mover, (movido) => {
            updateMarker(movido, true)
        })
        return () => {
            socket?.off(MapEvent.mover)
        }
    }, [socket])

    // * Escuchar creacion de marcadores
    useEffect(() => {
        socket?.on(MapEvent.crear, (nuevo) => {
            addMarker(nuevo)
        })
        return () => {
            socket?.off(MapEvent.crear)
        }
    }, [socket])

    // * Emitir la creacion de nuevos markers
    useEffect(() => {
        nuevoMarker$.subscribe(nuevo => {
            socket?.emit(MapEvent.crear, nuevo)
        })
    }, [nuevoMarker$, socket])

    // * Emitir el movimiento de marcador
    useEffect(() => {
        moverMarcador$.subscribe(movido => {
            socket?.emit(MapEvent.mover, movido)
        })
    }, [moverMarcador$, socket])


    return { markers, updateMarker }
}
