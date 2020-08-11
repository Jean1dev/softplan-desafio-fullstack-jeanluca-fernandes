import React, { createContext, useState, useCallback, useContext } from 'react';
import api from '../../services/api';

interface User {
    id: string
    tipoUsuario: string
    name: string
    login: string
    senha: string
}

interface SignInCredentials {
    login: string
    senha: string
}

interface AuthContextProps {
    user: User
    signIn(credentials: SignInCredentials): Promise<void>
    signOut(): void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<User>(() => {
        const user = localStorage.getItem('@Tech:Softplan:User')

        if (user) {
            return JSON.parse(user)
        }

        return {} as User
    })

    const signIn = useCallback(async ({ login, senha }) => {
        const response = await api.post('/login', { login, senha })

        const { user } = response.data
        localStorage.setItem('@GoBarber:user', JSON.stringify(user))
        setData(user)
    }, [])

    const signOut = useCallback(() => {
        localStorage.clear()
        setData({} as User)
    }, [])

    return (
        <AuthContext.Provider value={{ user: data, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextProps {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('Contexto nao inicializado')
    }

    return context
}

export { AuthProvider, useAuth }