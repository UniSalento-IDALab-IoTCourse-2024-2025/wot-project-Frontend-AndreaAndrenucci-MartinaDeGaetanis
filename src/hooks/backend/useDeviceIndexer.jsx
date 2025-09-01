import React, { useEffect, useState } from 'react'
import { BASE_URL, API_ENDPOINTS} from '../../constants/backend_ops';
import axios from 'axios';

const DEVICE_INDEXER_OPS = API_ENDPOINTS.INDEXER;

const useDeviceIndexer = (fetchType = DEVICE_INDEXER_OPS.GET_DATAMAP_BY_PARAMS) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const jwt = sessionStorage.getItem('jwt') ? sessionStorage.getItem('jwt') : ""

    const useMethods = async ({ postPayload = null } = {}, { postParams = null } = {}) => {
        setLoading(true);
        setError(null);


        const headers = {
            'Authorization': `Bearer ${jwt}`,
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
                case DEVICE_INDEXER_OPS.TEST_CONNECTION:
                    response = await axios.get(url, config);
                    return response?.status == 200 ? true : false
                case DEVICE_INDEXER_OPS.DISCONNECT_DEVICE:
                    response = await axios.delete(url, data, {...config});
                    return response?.status == 200 ? true : false
                case DEVICE_INDEXER_OPS.GET_ALL_DEVICES:
                    response = await axios.get(url, config);
                    return response?.data?.payload
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
            fetchType == DEVICE_INDEXER_OPS.GET_TEST_CONNECTION
        ) {
            useMethods();
        }
    },[]);

    return { loading, error, useMethods };

}

export default useDeviceIndexer