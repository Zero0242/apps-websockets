import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context'
import './ChatLayout.css'

export const ChatLayout = () => {
    const { status } = useContext(AuthContext)


    if (status === 'checking') return <p>Cargando...</p>
    if (status === 'disconnected') return <Navigate to="/auth/login" />


    return (
        <>
            <div className="messaging">
                <div className="inbox_msg">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
