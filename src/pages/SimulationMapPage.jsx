import React, { useEffect, useState } from 'react'
import { SimulationDatasPopUp, SimulationMap } from '../components'
import { useDeviceDataProcessor } from '../hooks/backend';
import { API_ENDPOINTS } from '../constants/backend_ops';

const SimulationMapPage = () => {
    const DEVICE_DATA_PROCESSOR_OPS = API_ENDPOINTS.DEVICE;

    const [errMsg, setErrMsg] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    const [treesNumber, setTreeNumbers] = useState(1)
    const [selectedCoords, setSelectedCoords] = useState(null);
    const [selectedHour, setSelectedHour] = useState("00:00");
    const [selectedDate, setSelectedDate] = useState(() =>
        new Date().toISOString().split('T')[0]
    );


    const { useMethods: getMapByParams} = useDeviceDataProcessor(
        DEVICE_DATA_PROCESSOR_OPS.GET_DATAMAP_BY_PARAMS
    );

    const { useMethods: getLastDatamap } = useDeviceDataProcessor(
        DEVICE_DATA_PROCESSOR_OPS.GET_LAST_DATAMAP
    );

    const { useMethods: startSimulation, loading: simulationLoading } = useDeviceDataProcessor(
        DEVICE_DATA_PROCESSOR_OPS.START_SIMULATION
    );

    const initializeDateAndMap = async () => {
        try {
            const metaResponse = await getLastDatamap(
                { postPayload: null },
                {
                    postParams: {
                        pollutant: "pm10"
                    },
                }
            );

            const metadata = metaResponse?.payload?.[0];

            if (metadata?.date) {
                const dateObj = new Date(metadata.date);

                const formattedDate = dateObj.toISOString().split('T')[0];
                const hour = dateObj.getHours();

                setSelectedDate(formattedDate);
                setSelectedHour(hour);
            } else {
                console.warn("Nessuna data trovata nella risposta.");
            }


        } catch (e) {
            console.error(e)
        }
    }


    const checkMapExists = async () => {
        try {
            const response = await getMapByParams(
                {}, 
                {
                    postParams: {
                        region: "Lecce",
                        date: selectedDate,
                        hour: selectedHour.toString().padStart(2, '0'),
                        filename: 'kriging_map_pm10.png',
                    }
                }
            );

            if (response?.code == 1){
                return false
            } else {
                return true
            }
            
        } catch (error) {
            console.error("Errore nel recupero dell'immagine:", error);
        }
    };

    const handleCoordsSelection=(coords, errStatus)=>{
        setSelectedCoords(coords)
        setErrMsg(errStatus)
    }

    useEffect(() => {
        initializeDateAndMap();
    }, []);



const handleSubmit = async () => {

    if (!selectedCoords){
        setErrMsg("Selezionare le coordinate")
        return;
    }

    const mapExists = await checkMapExists()

    if(!mapExists){
        setErrMsg("Nessuna misura per la data selezionata")
        return;
    }

    try {

        setErrMsg(null)

        const response = await startSimulation(
            {
                postPayload: {
                    lat_max: selectedCoords[1][0],
                    lon_min: selectedCoords[0][1],
                    lat_min: selectedCoords[0][0],
                    lon_max: selectedCoords[1][1],
                    n_points: Number(treesNumber),
                    date: `${selectedDate}T${String(selectedHour).padStart(2, "0")}:00:00`
                }
            },
            DEVICE_DATA_PROCESSOR_OPS.START_SIMULATION
        );

        const blob = new Blob([response.data], { type: 'application/zip' });
        const urlBlob = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = urlBlob;
        link.setAttribute("download", "simulation_results.zip");
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(urlBlob);

        setIsOpen(false);
    } catch (err) {
        console.error("Errore nel download della simulazione:", err);
    }
};



    return (
        <div className="w-full h-screen relative">
            <SimulationDatasPopUp
                isOpen={isOpen}
                onClose={setIsOpen}
                onSubmit={handleSubmit}
                treesNumber={treesNumber}
                setTreesNumber={setTreeNumbers}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedHour={selectedHour}
                setSelectedHour={setSelectedHour}
                errMsg={errMsg}
                loading={simulationLoading}
            />
            <SimulationMap bounds={selectedCoords} setBounds={handleCoordsSelection} />
            <div className='absolute flex flex-row justify-end items-center w-[1700px] bottom-5 right-[800px] translate-x-1/2 z-[9999]'>
                <button
                    type="submit"
                    className=" bg-primary text-white h-16 px-10 rounded-lg mb-[20px] mr-20"
                    onClick={()=>setIsOpen(true)}
                >
                    {false ? 'Caricamento...' : 'Inizia Simulazione'}
                </button>
            </div>
        </div>
    )
}

export default SimulationMapPage
