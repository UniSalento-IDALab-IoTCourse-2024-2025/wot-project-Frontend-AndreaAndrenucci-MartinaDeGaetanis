import React, { useEffect, useState, createContext, useContext } from 'react'
import { BASE_URL, API_ENDPOINTS} from '../../constants/backend_ops';
import axios from 'axios';

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ fields: {}, message: '' });

    const clearError = () => {
        setError({ fields: {}, message: '' });
    };


    const processRegistrationRequest = async (endpoint, options = {}) => {
        setLoading(true);
        clearError();

        const { 
            method = 'GET', 
            data = null, 
            params = null 
        } = options;

        try {
            const config = {
                method,
                url: BASE_URL + endpoint,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            if (method === 'POST' || method === 'PUT') {
                config.data = data;
            }

            if (method === 'GET' && params) {
                config.params = params;
            }

            console.log("Request config:", config);

            const response = await axios(config);
            
            return {
                status: response.status,
                data: response.data
            };

            
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    };


    const registration = async (name, surname, emailParam, password, userType) => {
        try {
            const { status, data } = await processRegistrationRequest(API_ENDPOINTS.REGISTRATION.REGISTRATION_USER, {
                method: 'POST',
                data: { name, surname, email: emailParam, password, userType }
            });


            console.log("Registration response:", data);

            if (data.result === 0) {
                setEmail(emailParam);
                console.log("L'email è:", emailParam);

                return {
                    success: true,
                    message: data.message
                };
            } else {
                if (data.errors){
                    setError({
                        fields: data.errors,
                        message: ''
                    });
                } else {
                    setError({ 
                        fields: {},
                        message: data.message || 'Registrazione fallita' 
                    });
                }
                throw new Error(data.message || 'Registrazione fallita');
            }

        } catch (error) {
            console.error("Registrazione fallita:", error);
            if (error.response?.data?.errors) {
                setError({
                    fields: error.response.data.errors,
                    message: ''
                });
            } else {
                setError({
                    fields: {},
                    message: error.response?.data?.message || error.message || 'Errore durante la registrazione'
                });
            }
            throw error;
        }
    };



    const verification_account = async (email, verificationCode) => {
        try {
            const { status, data } = await processRegistrationRequest(API_ENDPOINTS.REGISTRATION.VERIFY_EMAIL, {
                method: 'POST',
                data: { email, verificationCode }
            });

            console.log("Verification response:", status);

            if (status === 200 && data.message) {
                return {
                    success: true,
                    message: data.message
                };
            } else {
                const errorMessage = data.message || 'Errore durante la verifica';
                setError({ 
                    fields: {},
                    message: errorMessage
                });
                throw new Error(errorMessage);
            }

        } catch (error) {
            const errorMessage =
                error?.response?.data?.message || 
                'Errore durante la verifica';

            setError({ 
                fields: {},
                message: errorMessage
            });

            console.error("Errore durante la verifica:", errorMessage);
            throw new Error(errorMessage);
        }
    };


    const resendVerificationEmail = async (email) => {

        try {
            const { status, data } = await processRegistrationRequest(API_ENDPOINTS.REGISTRATION.RESEND_VERIFICATION, {
                method: 'GET',
                params: { email }
            });

            console.log("Resend verification response:", status);
            
            if (status === 200 && data.message) {
                return {
                    success: true,
                    message: data.message
                };
            } else {
                const errorMessage = data.message || 'Errore durante l\'invio dell\'email di verifica';
                setError({ 
                    fields: {},
                    message: errorMessage
                });
                throw new Error(errorMessage);
            }

        } catch (error) {
            const errorMessage =
                error?.response?.data?.message || 
                'Errore durante l\'invio dell\'email di verifica';

            setError({ 
                fields: {},
                message: errorMessage
            });

            console.error("Errore durante l'invio dell'email di verifica:", errorMessage);
            throw new Error(errorMessage);
        }
    }



    const value = {
        email,
        loading,
        error,

        registration,
        verification_account,
        resendVerificationEmail
    };

    return (
        <RegistrationContext.Provider value={value}>
            {children}
        </RegistrationContext.Provider>
    );

}

export const useRegistrationProcessor = () => {
    const context = useContext(RegistrationContext);
    if (!context) {
        throw new Error('useRegistrationProcessor deve essere usato all\'interno di <RegistrationProvider>');
    }
    return context;
};

export default useRegistrationProcessor;