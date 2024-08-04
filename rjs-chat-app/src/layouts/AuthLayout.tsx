import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context';
import './AuthLayout.css';

export const AuthLayout = () => {
    const { status } = useContext(AuthContext)

    console.log(status);


    if (status === 'connected') return <Navigate to="/chat" />

    return (
        <>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-t-50 p-b-90">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
