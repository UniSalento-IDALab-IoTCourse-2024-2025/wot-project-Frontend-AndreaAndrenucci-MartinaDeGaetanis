import React from 'react'
import { FaTrash } from "react-icons/fa";

import { API_ENDPOINTS } from '../../constants/backend_ops';
import { useDeviceIndexer } from '../../hooks/backend';
import { AiOutlineLoading } from 'react-icons/ai';


const DeviceTableSection = ({ data, id }) => {
    const entries = Object.entries(data || {});
    const midIndex = Math.ceil(entries.length / 2);

    const {loading, useMethods: disconnectDevice } = useDeviceIndexer(API_ENDPOINTS.INDEXER.DISCONNECT_DEVICE);


    const handleDisconnection = async() => {

        if(loading){
            return
        }


        const success = await disconnectDevice(
                { postPayload: null },
                {
                    postParams: {
                        device_id: id
                    },
                }
            );

        if(!success){
            alert("Errore nella disconnessione")
        } else {
            alert("Dispositivo disconnesso correttamente")
            window.location.reload()
        }
    }

    return (
        <>
            <div className='text-softblack font-medium flex flex-row gap-4'>
                {/* Prima colonna */}
                <div className='w-[500px] flex flex-col gap-1 justify-start'>
                    {entries.slice(0, midIndex).map(([key, value]) => (
                        <p key={key}><strong>{formatKey(key)}:</strong> {formatValue(value)}</p>
                    ))}
                </div>
                {/* Seconda colonna */}
                <div className='w-[500px] flex flex-col gap-1 justify-start'>
                    {entries.slice(midIndex).map(([key, value]) => (
                        <p key={key}><strong>{formatKey(key)}:</strong> {formatValue(value)}</p>
                    ))}
                </div>
            </div>

            <div 
                className='flex flex-row text-lightgray text-md  transition-all duration-200 justify-end items-center gap-4 pr-5'
                onClick={()=>handleDisconnection()}
            >
                {
                    loading ? <AiOutlineLoading className=' animate-spin text-softblack opacity-50'/> : <FaTrash className='hover:text-err-main hover:opacity-80'/>
                }
            </div>
        </>
    );

}

const formatKey = (key) => key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());

const formatValue = (value) => {
    if (Array.isArray(value)) {
        return value.map(v => v.name || v).join(", ");
    }
    return value?.toString() || "N/A";
};


export default DeviceTableSection