import React, { useEffect, useState } from 'react'
import { BASE_URL, API_ENDPOINTS} from '../../constants/backend_ops';
import axios from 'axios';

const SERVICE_HEALTH_OPS = API_ENDPOINTS.HEALTH_CHECK_API;

const useHealthCheck = (fetchType = SERVICE_HEALTH_OPS.TEST_CONNECTION_USER) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const useMethods = async ({ postPayload = null } = {}, { postParams = null } = {}) => {
        setLoading(true);
        setError(null);

        const headers = {}

        try {
            const url = BASE_URL + fetchType.replace(/{(\w+)}/g, (_, key) => postParams[key] || '');
            const config = {
                headers: { ...headers },
                params: postParams
            };

            const data = postPayload

            let response;


            switch (fetchType) {
                case SERVICE_HEALTH_OPS.TEST_CONNECTION_USER:
                    response = await axios.get(url, config);
                    return response?.status == 200 ? true : false
                case SERVICE_HEALTH_OPS.TEST_CONNECTION_NOTIFICATION:
                    response = await axios.get(url, config);
                    return response?.status == 200 ? true : false
                default:
                    throw new Error(`Unsupported fetch type: ${fetchType}`);
            }

        } catch (err) {
            setError(err);
            console.error("Error occurred while fetching data:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (
            fetchType == SERVICE_HEALTH_OPS.TEST_CONNECTION_USER
        ) {
            useMethods();
        }
    },[]);

    return { loading, error, useMethods };

}

export default useHealthCheck