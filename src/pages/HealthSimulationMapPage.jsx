import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, ImageOverlay } from 'react-leaflet';
import { MapUpdater } from '../components';
import {supportedRegions } from '../constants/constants';
import 'leaflet/dist/leaflet.css';
import { useDeviceDataProcessor } from '../hooks/backend';
import { API_ENDPOINTS } from '../constants/backend_ops';
import { no_data_placeholder } from '../assets';
import { useAuthenticationProcessor } from '../hooks/backend/useAuthenticationProcessor';
import { hasPermission, PERMISSIONS } from '../constants/permissions';
import { useNavigate } from 'react-router-dom';
import { SimulationHealthPopUp} from '../components'
import { ThreeDot } from 'react-loading-indicators';
import {setSimulationState, getSimulationState, clearSimulationState} from '../constants/simulationManager';

const HealthSimulationMapPage = () => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)
    const [simulationInProgress, setSimulationInProgress] = useState(() => getSimulationState().inProgress || false); //Diventa false quando l'immagine è stata elaborata
    const [simulationActive, setSimulationActive] = useState(() => getSimulationState().active || false); //Diventa true quando la simulazione viene avviata
    const [selectedDate, setSelectedDate] = useState(() => getSimulationState().date || new Date().toISOString().split('T')[0]);
    const [viewSimulationMap, setViewSimulationMap] = useState(false); //Diventa true quando l'utente clicca sul bottone per vedere la mappa della simulazione
    const {role, authed} = useAuthenticationProcessor();

    useEffect(() => {
        if (!authed || !hasPermission(role, PERMISSIONS.HEALTH_SIMULATIONS)) {
            navigate('/');
        }
    }, [authed, role, navigate]);

    const [lastDate, setLastDate] = useState(() =>
        new Date().toISOString().split('T')[0]
    );
    const [selectedRegion, setSelectedRegion] = useState(supportedRegions[0])
    const [imageUrl, setImageUrl] = useState(null);



    const DEVICE_DATA_PROCESSOR_OPS = API_ENDPOINTS.DEVICE;

    const { useMethods: getLastHealthDatamap } = useDeviceDataProcessor(
        DEVICE_DATA_PROCESSOR_OPS.GET_LAST_HEALTH_MAP
    );

    const { useMethods: getHealthImage } = useDeviceDataProcessor(
        DEVICE_DATA_PROCESSOR_OPS.GET_HEALTH_MAP_BY_NAME
    );

    const { useMethods: startSimulation, loading: simulationLoading } = useDeviceDataProcessor(
        DEVICE_DATA_PROCESSOR_OPS.START_HEALTH_SIMULATION
    );

    const { useMethods: deleteHealthImage} = useDeviceDataProcessor(
        DEVICE_DATA_PROCESSOR_OPS.DELETE_HEALTH_MAP
    );


    const initializeDateAndMap = async () => {
        try {
            const metaResponse = await getLastHealthDatamap(
                { postPayload: null },
            );

            const metadata = metaResponse?.payload?.[0];

            if (metadata?.date) {

                const dateObj = new Date(metadata.date);
                const formattedDate = dateObj.toISOString().split('T')[0];

                setLastDate(formattedDate);

                await getSelectedMap(formattedDate);
            } else {
                console.warn("Nessuna data trovata nella risposta");
            }
        } catch (error) {
            console.error("Errore nel recupero dei metadati:", error);
        }
    };

    const getSelectedMap = async (customDate = lastDate, setSimulationActive) => {

        if (setSimulationActive) {
            setViewSimulationMap(true);
        }

        try {

            const response = await getHealthImage(
                { postPayload: null },
                {
                    postParams: {
                        filename: 'health_impact_map_' + customDate + '.png',
                    },
                },
                DEVICE_DATA_PROCESSOR_OPS.GET_HEALTH_MAP_BY_NAME
            );

            if (response?.image_base64) {
                const base64Url = `data:image/png;base64,${response.image_base64}`;
                setImageUrl(base64Url);
                if (setSimulationActive){
                    if (pollIntervalRef.current) {
                        clearInterval(pollIntervalRef.current);
                        pollIntervalRef.current = null;
                    }
                    setSimulationActive(false);
                    setSimulationInProgress(false);
                    setSimulationState(false, selectedDate, false);
                } 
            } else {
                console.info('La risposta non contiene image_base64.');
                setImageUrl(no_data_placeholder);
            }
        } catch (error) {
            console.error("Errore nel recupero dell'immagine:", error);
        }
    };

    useEffect(() => {
        initializeDateAndMap();
        const { inProgress, date, active } = getSimulationState();
        setSimulationInProgress(inProgress);
        setSimulationActive(active);
        if (date) {
            setSelectedDate(date);
            
            if (inProgress) {
                console.log('Riprendendo simulazione in corso per:', date);
                startPollingForResult(date);
            }
        }
    }, []);

    useEffect(() => {
        getSelectedMap();
    }, [lastDate]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden && simulationInProgress) {

                console.log('Pagina visibile - controllo immediato stato simulazione');
                
                if (pollIntervalRef.current) {
                    setTimeout(() => {
                        if (selectedDate) {
                            checkSimulationStatus(selectedDate);
                        }
                    }, 1000);
                }
            }
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [simulationInProgress, selectedDate]);

    
    const handleSubmit = async () => {

        setIsOpen(false);
        try {

            setSimulationInProgress(true);
            setSimulationActive(true);
            setSimulationState(true, selectedDate, true);

            const response = await startSimulation(
                {
                    postPayload: {
                        date: selectedDate
                    }
                },
                DEVICE_DATA_PROCESSOR_OPS.START_HEALTH_SIMULATION
            )


            if (response?.data?.status === "success"){
                startPollingForResult(selectedDate);
            } else {
                setSimulationActive(false);
                setSimulationInProgress(false);
                setSimulationState(false, selectedDate, false);
            }

        } catch (err) {
            console.error("Errore nell'avvio della simulazione:", err);
            setSimulationActive(false);
            setSimulationInProgress(false);
            setSimulationState(false, selectedDate, false);
        }
    };


    //Aggiunta funzionalità di polling
    const pollIntervalRef = React.useRef(null);
    const startPollingForResult = (date) => {
        if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
        }
        
        pollIntervalRef.current = setInterval(async () => {
            try {
                // Controlla solo se l'immagine esiste
                const response = await getHealthImage(
                    { postPayload: null },
                    {
                        postParams: {
                            filename: 'health_impact_map_' + date + '.png',
                        },
                    },
                    DEVICE_DATA_PROCESSOR_OPS.GET_HEALTH_MAP_BY_NAME
                );

                if (response?.image_base64) {
                    clearInterval(pollIntervalRef.current);
                    pollIntervalRef.current = null;

                    setSimulationInProgress(false);
                    setSimulationState(false, date, true);
                    
                    console.log('Simulazione completata!');
                }
                
            } catch (error) {
                console.log('Simulazione ancora in corso...');
            }
        }, 5000);
    };


    useEffect(() => {
        return () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }
        };
    }, []);


    const handleDeleteImage = async () => {

        console.log(selectedDate)
        try {
            const response = await deleteHealthImage(
                { postPayload: null },
                {
                    postParams: {
                        filename: 'health_impact_map_' + selectedDate + '.png',
                    },
                },
                DEVICE_DATA_PROCESSOR_OPS.DELETE_HEALTH_MAP
            );

            if (response?.code === 0){
                const newDate = new Date().toISOString().split('T')[0];
                setSelectedDate(newDate);
                setViewSimulationMap(false);
                
                if (pollIntervalRef.current) {
                    clearInterval(pollIntervalRef.current);
                    pollIntervalRef.current = null;
                }
                
                clearSimulationState();
                
                setSimulationInProgress(false);
                setSimulationActive(false);
                
                initializeDateAndMap();
            }

        } catch (error) {
            console.error("Errore nel cancellare l'immagine:", error);
        }
    }



    return (
        <div className="w-full h-screen relative">

            <MapContainer
                center={[41.9, 15.0]}
                zoom={9}
                scrollWheelZoom={true}
                className="w-full h-full z-10"
            >
                <MapUpdater region={selectedRegion} />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {imageUrl && (
                    <ImageOverlay
                        url={imageUrl}
                        bounds={selectedRegion.bounds}
                        opacity={0.55}
                    />
                )}
            </MapContainer>


            <SimulationHealthPopUp
                isOpen={isOpen}
                onClose={setIsOpen}
                onSubmit={handleSubmit}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                loading={simulationLoading}
            />
            
            <div className="fixed bottom-10 right-8 flex flex-col items-end gap-4 z-[9999]">
                {simulationActive && !viewSimulationMap &&
                    <button
                        type="submit"
                        className={`bg-primary text-white h-auto px-6 py-5 rounded-lg whitespace-normal max-w-[250px] flex flex-col items-center gap-4 shadow-lg ${simulationInProgress ? 'cursor-not-allowed' : ''}`}
                        onClick={() => getSelectedMap(selectedDate, setSimulationActive)}
                    >
                        <span className="text-center">
                            {simulationInProgress
                            ? `Simulazione del ${new Date(selectedDate).toLocaleDateString('it-IT')} in fase di elaborazione`
                            : `Risultati della simulazione del ${new Date(selectedDate).toLocaleDateString('it-IT')}`}
                        </span>
                        {simulationInProgress &&
                            <ThreeDot color="#FBFBFB" size="small" text="" textColor="" />
                        }
                    </button>
                }

                {viewSimulationMap &&
                    <button
                        type="submit"
                        className={`bg-primary text-white h-auto px-6 py-5 rounded-lg whitespace-normal w-[250px] flex flex-col items-center gap-4 shadow-lg`}
                        onClick={() => handleDeleteImage()}
                    >
                        <span className="text-center">
                            Esci dalla simulazione
                        </span>
                    </button>
                }
                <button
                    type="submit"
                    className={`bg-primary text-white h-16 px-10 rounded-lg shadow-lg w-[250px] ${simulationActive || viewSimulationMap ? 'bg-opacity-60 cursor-not-allowed' : ''}`}
                    onClick={() => setIsOpen(true)}
                >
                    {false ? 'Caricamento...' : 'Inizia Simulazione'}
                </button>
            </div>

        </div>

    );
};

export default HealthSimulationMapPage;
