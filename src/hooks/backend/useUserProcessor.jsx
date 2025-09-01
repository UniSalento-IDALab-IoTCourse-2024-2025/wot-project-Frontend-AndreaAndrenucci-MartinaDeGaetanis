import React, { useEffect, useState, createContext, useContext } from 'react'
import { BASE_URL, API_ENDPOINTS} from '../../constants/backend_ops';
import axios from 'axios';
import { useAuthenticationProcessor } from './useAuthenticationProcessor';


const useUserProcessor = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ fields: {}, message: '' });

    const {jwt, id} = useAuthenticationProcessor();

    const clearError = () => {
        setError({ fields: {}, message: '' });
    };


    const processUserRequest = async (endpoint, options = {}) => {
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
                    'Authorization': `Bearer ${jwt ? jwt : sessionStorage.getItem('jwt') ? sessionStorage.getItem('jwt') : ""}`,
                },
            };

            if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
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


    const getUserFromEmail = async (email) => {
        try {
            const { status, data } = await processUserRequest(API_ENDPOINTS.USER.GET_USER_FROM_EMAIL, {
                method: 'GET',
                params: { email }
            });

            console.log("User by email response:", data);

            if (status === 200) {
                return {
                    success: true,
                    data: data
                };
            } else {
                const errorMessage = "Errore durante il recupero dell'utente";
                setError({ 
                    fields: {},
                    message: errorMessage
                });
                throw new Error(errorMessage);
            }
        } catch (error) {
            const errorMessage = "Errore durante il recupero dell'utente";
            setError({ 
                fields: {},
                message: errorMessage
            });
            throw new Error(errorMessage);
        }

    }


    const updateUserProfile = async (name, surname, email, userType) => {

        const endpoint = API_ENDPOINTS.USER.UPDATE_USER_PROFILE.replace('{id}', id);

        try {
            const { status, data } = await processUserRequest(endpoint, {
                method: 'PATCH',
                data: { name, surname, email, userType }
            });

            console.log("Update response:", data);
            
            if (status === 200) {        

                return {
                    success: true,
                    data: data
                };

            } else {
                const errorMessage = data.message || 'Errore durante l\'aggiornamento del profilo';
                setError({ 
                    fields: {},
                    message: errorMessage
                });
                throw new Error(errorMessage);
            }
            
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Errore durante l\'aggiornamento del profilo';
            setError({ 
                fields: {},
                message: errorMessage
            });
            throw new Error(errorMessage);
        }
    }

    const changePassword = async (oldPassword, newPassword, confirmNewPassword) => {

        const endpoint = API_ENDPOINTS.USER.CHANGE_PASSWORD.replace('{id}', id);

        try {
            const { status, data } = await processUserRequest(endpoint, {
                method: 'POST',
                data: { oldPassword, newPassword, confirmNewPassword }
            });


            if (data.result === 0) {
                return {
                    success: true,
                    data: data.message
                };
            } else {
                const errorMessage = data.message || 'Errore durante la modifica della password';
                setError({ 
                    fields: {},
                    message: errorMessage
                });
                throw new Error(errorMessage);
            }
            
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Errore durante la modifica della password';
            setError({ 
                fields: {},
                message: errorMessage
            });
            throw new Error(errorMessage);
        }
    };

    
    const deleteProfile = async() => {
        
        const endpoint = API_ENDPOINTS.USER.DELETE_USER.replace('{id}', id);

        try {
            const { status, data } = await processUserRequest(endpoint, {
                method: 'DELETE',
            });


            if (status === 200) {
                return {
                    success: true,
                    data: data.message
                };
            } else {
                const errorMessage = data.message || 'Errore durante l\'eliminazione del profilo';
                setError({ 
                    fields: {},
                    message: errorMessage
                });
                throw new Error(errorMessage);
            }

        } catch (error){
            const errorMessage = error?.response?.data?.message || 'Errore durante l\'eliminazione del profilo';
            setError({ 
                fields: {},
                message: errorMessage
            });
            throw new Error(errorMessage);

        }


    }


    const getUsersFromDomain = async (domain) => {

         try {
            const { status, data } = await processUserRequest(API_ENDPOINTS.USER.GET_USERS_FROM_DOMAIN, {
                method: 'GET',
                params: { domain }
            });


            if (status === 200) {
                return {
                    success: true,
                    data: data
                };
            } else {
                const errorMessage = "Errore durante il recupero degli utenti";
                setError({ 
                    fields: {},
                    message: errorMessage
                });
                throw new Error(errorMessage);
            }
        } catch (error) {
            const errorMessage = "Errore durante il recupero degli utenti";
            setError({ 
                fields: {},
                message: errorMessage
            });
            throw new Error(errorMessage);
        }

    }

    const getListRegularUsers = async () => {

         try {
            const { status, data } = await processUserRequest(API_ENDPOINTS.USER.GET_USERS_REGULAR, {
                method: 'GET',
            });


            if (status === 200) {
                return {
                    success: true,
                    data: data
                };
            } else {
                const errorMessage = "Errore durante il recupero degli utenti";
                setError({ 
                    fields: {},
                    message: errorMessage
                });
                throw new Error(errorMessage);
            }
        } catch (error) {
            const errorMessage = "Errore durante il recupero degli utenti";
            setError({ 
                fields: {},
                message: errorMessage
            });
            throw new Error(errorMessage);
        }

    }

    const getListResearchersUsers = async () => {

         try {
            const { status, data } = await processUserRequest(API_ENDPOINTS.USER.GET_USERS_RESEARCHERS, {
                method: 'GET',
            });


            if (status === 200) {
                return {
                    success: true,
                    data: data
                };
            } else {
                const errorMessage = "Errore durante il recupero degli utenti";
                setError({ 
                    fields: {},
                    message: errorMessage
                });
                throw new Error(errorMessage);
            }
        } catch (error) {
            const errorMessage = "Errore durante il recupero degli utenti";
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

        getUserFromEmail,
        updateUserProfile,
        changePassword,
        deleteProfile,
        getUsersFromDomain,
        getListRegularUsers,
        getListResearchersUsers
    };

}


export default useUserProcessor;