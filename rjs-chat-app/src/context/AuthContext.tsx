import { createContext, useEffect, useState } from "react";
import { Usuario } from "../core/interfaces";
import * as UseCases from '../core/usecases/auth';

type AuthStatus = 'connected' | 'disconnected' | 'checking'

interface ContextProps {
    usuario: Usuario | undefined
    startLogout: () => void
    startLogin: (email: string, password: string) => Promise<boolean>
    status: AuthStatus
}

export const AuthContext = createContext({} as ContextProps)



export const AuthProvider = ({ children }: any) => {
    const [usuario, setUsuario] = useState<Usuario>()
    const [authStatus, setAuthStatus] = useState<AuthStatus>('checking')

    useEffect(() => {
        checkToken()
    }, [])



    const checkToken = async () => {
        const token = localStorage.getItem('authToken')
        if (!token) { setAuthStatus('disconnected'); return false }
        const { ok, usuario } = await UseCases.checkLoginUseCase()
        if (!ok) { setAuthStatus('disconnected'); return false }
        setUsuario(usuario)
        setAuthStatus('connected')
        return true

    }

    const startLogin = async (email: string, password: string) => {
        const { ok, usuario } = await UseCases.loginUseCase(email, password)
        if (!ok) return false;
        setUsuario(usuario)
        setAuthStatus('connected')
        return true

    }

    const startLogout = () => {
        localStorage.removeItem('authToken')
        setUsuario(undefined)
        setAuthStatus('disconnected')
    }

    return (
        <AuthContext.Provider value={{ usuario, startLogin, status: authStatus, startLogout }}>
            {children}
        </AuthContext.Provider>
    )
}
