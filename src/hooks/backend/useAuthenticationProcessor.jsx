import React, { useEffect, useState, createContext, useContext } from 'react'
import { BASE_URL, API_ENDPOINTS } from '../../constants/backend_ops'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const AuthenticationContext = createContext()

export const AuthenticationProvider = ({ children }) => {
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [authed, setAuthed] = useState(false)
    const [jwt, setJwt] = useState('')
    const [id, setId] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ fields: {}, message: '' })

    useEffect(() => {
        const storedJwt = sessionStorage.getItem('jwt')
        const storedEmail = sessionStorage.getItem('email')
        const storedRole = sessionStorage.getItem('role')
        const storedId = sessionStorage.getItem('id')

        if (storedJwt && storedEmail && storedRole && storedId) {
            setJwt(storedJwt)
            setEmail(storedEmail)
            setRole(storedRole)
            setId(storedId)
            setAuthed(true)
        }
    }, [])

    const clearError = () => {
        setError({ fields: {}, message: '' })
    }

    const processAuthenticationRequest = async (endpoint, options = {}) => {
        setLoading(true)
        clearError()
        const { method = 'GET', data = null, params = null } = options
        try {
            const config = {
                method,
                url: BASE_URL + endpoint,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            if (method === 'POST' || method === 'PUT') {
                config.data = data
            }
            if (method === 'GET' && params) {
                config.params = params
            }
            const response = await axios(config)
            return { status: response.status, data: response.data }
        } catch (err) {
            throw err
        } finally {
            setLoading(false)
        }
    }

    const authentication = async (emailLogin, password) => {
        try {
            const { status, data } = await processAuthenticationRequest(API_ENDPOINTS.AUTH.LOGIN, {
                method: 'POST',
                data: { email: emailLogin, password }
            })
            if (data.result === 0) {
                const jwt = data.jwt
                const decoded = jwtDecode(jwt)
                const role = decoded.role || null
                const id = decoded.userId || null
                setEmail(emailLogin)
                setRole(role)
                setJwt(jwt)
                setId(id)
                setAuthed(true)
                sessionStorage.setItem('jwt', jwt)
                sessionStorage.setItem('email', emailLogin)
                sessionStorage.setItem('role', role)
                sessionStorage.setItem('id', id)
                return { success: true, message: data.message }
            } else {
                const errorMessage = data.message || 'Autenticazione fallita'
                setError({ fields: {}, message: errorMessage })
                throw new Error(errorMessage)
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Autenticazione fallita'
            setError({ fields: {}, message: errorMessage })
            throw new Error(errorMessage)
        }
    }

    const forgot_password = async (emailParam) => {
        try {
            const { status, data } = await processAuthenticationRequest(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
                method: 'GET',
                params: { email: emailParam }
            })
            if (status === 200) {
                return { success: true, message: data.message }
            } else {
                const errorMessage = data.message || "Errore durante l'invio dell'email"
                setError({ fields: {}, message: errorMessage })
                throw new Error(errorMessage)
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Errore durante l'invio dell'email"
            setError({ fields: {}, message: errorMessage })
            throw new Error(errorMessage)
        }
    }

    const logout = () => {
        setEmail('')
        setRole('')
        setJwt('')
        setId('')
        setAuthed(false)
        sessionStorage.removeItem('jwt')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('role')
        sessionStorage.removeItem('id')
    }

    const value = {
        email,
        role,
        authed,
        jwt,
        id,
        loading,
        error,
        authentication,
        forgot_password,
        logout
    }

    return (
        <AuthenticationContext.Provider value={value}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export const useAuthenticationProcessor = () => {
    const context = useContext(AuthenticationContext)
    if (!context) {
        const storedJwt = sessionStorage.getItem('jwt')
        const storedEmail = sessionStorage.getItem('email')
        const storedRole = sessionStorage.getItem('role')
        const storedId = sessionStorage.getItem('id')
        if (storedJwt && storedEmail && storedRole && storedId) {
            return {
                email: storedEmail,
                role: storedRole,
                authed: true,
                jwt: storedJwt,
                id: storedId,
                loading: false,
                error: { fields: {}, message: '' },
                authentication: async () => {},
                forgot_password: async () => {},
                logout: () => {
                    sessionStorage.removeItem('jwt')
                    sessionStorage.removeItem('email')
                    sessionStorage.removeItem('role')
                    sessionStorage.removeItem('id')
                }
            }
        }
        throw new Error('useAuthenticationProcessor deve essere usato all\'interno di <AuthenticationProvider>')
    }
    return context
}

export default useAuthenticationProcessor
