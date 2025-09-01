import React, { useEffect, useState } from 'react'
import { BASE_URL, API_ENDPOINTS} from '../../constants/backend_ops';
import axios from 'axios';

const DEVICE_DATA_PROCESSOR_OPS = API_ENDPOINTS.DEVICE;

const useDeviceDataProcessor = (fetchType = DEVICE_DATA_PROCESSOR_OPS.GET_DATAMAP_BY_PARAMS) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const jwt = sessionStorage.getItem('jwt') ? sessionStorage.getItem('jwt') : ""

    const useMethods = async ({ postPayload = null } = {}, { postParams = null } = {}) => {
        setLoading(true);
        setError(null);

        const headers = {
            'Authorization': "Bearer " + jwt,
        } 

        try {
            const url = BASE_URL + fetchType.replace(/{(\w+)}/g, (_, key) => postParams[key] || '');
            const config = {
                headers: { ...headers },
                params: postParams
            };

            const data = postPayload

            let response;
            // console.log("REQUEST", url)
            // console.log("CONFIG", config)
            // console.log("Data", data)


            switch (fetchType) {
                case DEVICE_DATA_PROCESSOR_OPS.GET_TEST_CONNECTION:
                    response = await axios.get(url, config);
                    return;
                case DEVICE_DATA_PROCESSOR_OPS.GET_DATAMAP_BY_PARAMS:
                    response = await axios.get(url, config);
                    return response?.data;
                case DEVICE_DATA_PROCESSOR_OPS.GET_LAST_DATAMAP:
                    response = await axios.get(url, config);
                    return response?.data;
                case DEVICE_DATA_PROCESSOR_OPS.START_SIMULATION:
                    response = await axios.post(url, data, {...config, responseType: 'blob'});
                    // console.log("RESPONSE", response)
                    return response;
                case DEVICE_DATA_PROCESSOR_OPS.GET_LAST_HEALTH_MAP:
                    response = await axios.get(url, config);
                    return response?.data;
                case DEVICE_DATA_PROCESSOR_OPS.START_HEALTH_SIMULATION:
                    response = await axios.post(url, data, {...config});
                    return response;
                case DEVICE_DATA_PROCESSOR_OPS.GET_HEALTH_MAP_BY_NAME:
                    response = await axios.get(url, config);
                    return response?.data;
                case DEVICE_DATA_PROCESSOR_OPS.DELETE_HEALTH_MAP:
                    response = await axios.delete(url, config);
                    return response?.data;
                case DEVICE_DATA_PROCESSOR_OPS.TEST_CONNECTION:
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
            fetchType == DEVICE_DATA_PROCESSOR_OPS.GET_TEST_CONNECTION
        ) {
            useMethods();
        }
    },[]);

    return { loading, error, useMethods };

}

export default useDeviceDataProcessor