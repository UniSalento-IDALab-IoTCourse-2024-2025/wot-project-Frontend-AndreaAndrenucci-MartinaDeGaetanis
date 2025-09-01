import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, API_ENDPOINTS} from '../../constants/backend_ops';


const useRecords = () => {
   
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ fields: {}, message: '' });

    const clearError = () => {
        setError({ fields: {}, message: '' });
    };

    const processRecordRequest = async (endpoint, options = {}) => {
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

            if (method === 'POST' || method === 'DELETE') {
                config.data = data;
            }

            if (method === 'GET' && params) {
                config.params = params;
            }


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


    const getDataGraphic = async (pollutant, start_date, finish_date) => {

        const endpoint = API_ENDPOINTS.DEVICE.GET_DATA_GRAPHIC
            .replace('{pollutant}', pollutant)
            .replace('{start_date}', start_date)
            .replace('{finish_date}', finish_date);

        try {
            const { status, data } = await processRecordRequest(endpoint, {
                method: 'GET',

            });


            if (status === 200) {
                return {
                    success: true,
                    data: data
                };
            } else {
                const errorMessage = "Errore durante il recupero dei dati";
                setError({ 
                    fields: {},
                    message: errorMessage
                });
                throw new Error(errorMessage);
            }
        } catch (error) {
            const errorMessage = "Errore durante il recupero dei dati";
            setError({ 
                fields: {},
                message: errorMessage
            });
            throw new Error(errorMessage);
        }
    }



    return { getDataGraphic};
};

export default useRecords;
