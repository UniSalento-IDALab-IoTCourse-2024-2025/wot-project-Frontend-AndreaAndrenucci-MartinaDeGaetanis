import React, { useEffect, useState } from 'react'
import TableCard from "./TableCard"
import {mock_devices} from "../../constants/mock"
import { useDeviceIndexer } from '../../hooks/backend';
import { API_ENDPOINTS } from '../../constants/backend_ops';

const DeviceHealthComponent = () => {
    const { useMethods: getAllDevices } = useDeviceIndexer(API_ENDPOINTS.INDEXER.GET_ALL_DEVICES);
    const [devices, setDevices] = useState(null)

    const handleDevicesFetching = async () => {
        setDevices(await getAllDevices());
    }

    useEffect(()=>{
        handleDevicesFetching()
    }, [])

    return (
        <>
        {
            devices?.map((device, index)=>(
                <div key={index} className='w-full'>
                    <TableCard
                        isActive = {device.status}
                        lable={device.device_id}
                        datas={{
                            "City":device.municipality,
                            "Province":device.province,
                            "Street":device.street,
                            "Ipv4":device.ipv4,
                            "Latitude":device.latitude,
                            "Longitude":device.longitude,
                        }}
                    />
                </div>
            ))
        }
        </>
    )
}

export default DeviceHealthComponent