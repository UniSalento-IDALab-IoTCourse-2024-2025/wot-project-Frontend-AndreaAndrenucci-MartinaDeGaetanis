import React, { useEffect, useState, createContext, useContext } from 'react'
import { BASE_URL, API_ENDPOINTS} from '../../constants/backend_ops';
import axios from 'axios';
import { useAuthenticationProcessor } from './useAuthenticationProcessor';

const useAdminProcessor = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ fields: {}, message: '' });

    const {jwt, id} = useAuthenticationProcessor();

    const clearError = () => {
        setError({ fields: {}, message: '' });
    };

    const processAdminRequest = async (endpoint, options = {}) => {
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
                    'Authorization': `Bearer ${jwt}`,
                },
            };

            if (method === 'POST' || method === 'DELETE') {
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


    const getAllDomains = async () => {
        try {
            const { status, data } = await processAdminRequest(API_ENDPOINTS.ADMIN.GET_DOMAINS, {
                method: 'GET',
            });

            console.log("Get all domains response:", data);

            if (status === 200) {
                return {
                    success: true,
                    data: data
                };
            } else {
                const errorMessage = "Errore durante il recupero dei domini";
                setError({ 
                    fields: {},
                    message: errorMessage
                });
                throw new Error(errorMessage);
            }
        } catch (error) {
            const errorMessage = "Errore durante il recupero dei domini";
            setError({ 
                fields: {},
                message: errorMessage
            });
            throw new Error(errorMessage);
        }
    }


    const addDomain = async(accreditedDomain) => {
        try {
            const { status, data } = await processAdminRequest(API_ENDPOINTS.ADMIN.ADD_DOMAIN, {
                method: 'POST',
                data: { accreditedDomain }
            });

            console.log("Add Domain response:", data);

            if (status === 201) {
                return {
                    success: true,
                    data: data.message
                };
            } else {
                const errorMessage = data.message || 'Errore durante l\' aggiunta del nuovo dominio';
                setError({ 
                    fields: {},
                    message: errorMessage
                });
                throw new Error(errorMessage);
            }
            
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Errore durante l\' aggiunta del nuovo dominio';
            setError({ 
                fields: {},
                message: errorMessage
            });
            throw new Error(errorMessage);
        }
    }


    const deleteDomain = async(accreditedDomain) => {
        try {
            const { status, data } = await processAdminRequest(API_ENDPOINTS.ADMIN.DELETE_DOMAIN, {
                method: 'DELETE',
                data: { accreditedDomain }
            });

            console.log("Delete Domain response:", data);

            if (status === 200) {
                return {
                    success: true,
                    data: data.message
                };
            } else {
                const errorMessage = data.message || 'Errore durante l\' eliminazione del nuovo dominio';
                setError({ 
                    fields: {},
                    message: errorMessage
                });
                throw new Error(errorMessage);
            }
            
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Errore durante l\' eliminazione del nuovo dominio';
            setError({ 
                fields: {},
                message: errorMessage
            });
            throw new Error(errorMessage);
        }
    }


    return {
        loading,
        error,

        getAllDomains,
        addDomain,
        deleteDomain
    }

}

export default useAdminProcessor;