import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, ImageOverlay } from 'react-leaflet';
import { MapSideBar, MapTimeBar, MapRegionSelector, MapUpdater } from '../components';
import { pollutants, supportedRegions } from '../constants/constants';
import 'leaflet/dist/leaflet.css';
import { useDeviceDataProcessor } from '../hooks/backend';
import { API_ENDPOINTS } from '../constants/backend_ops';
import { no_data_placeholder } from '../assets';
import { useAuthenticationProcessor } from '../hooks/backend/useAuthenticationProcessor';
import { hasPermission, PERMISSIONS } from '../constants/permissions';
import { useNavigate } from 'react-router-dom';


const MapPage = () => {

    const navigate = useNavigate();
    const {role, authed} = useAuthenticationProcessor();

    useEffect(() => {
        if (!authed || !hasPermission(role, PERMISSIONS.ACCESS_MAP)) {
            navigate('/');
        }
    }, [authed, role, navigate]);


    const [pollutantIndex, setPollutantIndex] = useState(0);
    const [selectedHour, setSelectedHour] = useState("00");
    const [selectedDate, setSelectedDate] = useState(() =>
        new Date().toISOString().split('T')[0]
    );
    const [selectedRegion, setSelectedRegion] = useState(supportedRegions[0])
    const [imageUrl, setImageUrl] = useState(null);

    const DEVICE_DATA_PROCESSOR_OPS = API_ENDPOINTS.DEVICE;

    const { useMethods: getMapByParams } = useDeviceDataProcessor(
        DEVICE_DATA_PROCESSOR_OPS.GET_DATAMAP_BY_PARAMS
    );
    const { useMethods: getLastDatamap } = useDeviceDataProcessor(
        DEVICE_DATA_PROCESSOR_OPS.GET_LAST_DATAMAP
    );

    const getSelectedPollutant = () => {
        return pollutants[pollutantIndex].label.toLowerCase() === "pm2.5" ? "pm2dot5" : pollutants[pollutantIndex].label.toLowerCase();
    };

    const initializeDateAndMap = async () => {
        try {
            const metaResponse = await getLastDatamap(
                { postPayload: null },
                {
                    postParams: {
                        pollutant: getSelectedPollutant()
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

                await getSelectedMap(formattedDate, hour);
            } else {
                console.warn("Nessuna data trovata nella risposta.");
            }
        } catch (error) {
            console.error("Errore nel recupero dei metadati:", error);
        }
    };

    const getSelectedMap = async (customDate = selectedDate, customHour = selectedHour) => {
        try {
            const response = await getMapByParams(
                { postPayload: null },
                {
                    postParams: {
                        region: selectedRegion?.region,
                        date: customDate,
                        hour: customHour.toString().padStart(2, '0'),
                        filename: 'kriging_map_' + getSelectedPollutant() + '.png',
                    },
                },
                DEVICE_DATA_PROCESSOR_OPS.GET_DATAMAP_BY_PARAMS
            );

            if (response?.image_base64) {
                const base64Url = `data:image/png;base64,${response.image_base64}`;
                setImageUrl(base64Url);
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
    }, []);

    useEffect(() => {
        getSelectedMap();
    }, [selectedHour, selectedDate, pollutantIndex, selectedRegion]);

    const handlePollutantSelection = (index) => {
        setPollutantIndex(index);
    };


    return (
        <div className="w-full h-screen relative">
            <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20">
                <MapSideBar handlePollutantSelection={handlePollutantSelection} />
            </div>

            <div className="absolute w-[1000px] bottom-5 right-[800px] translate-x-1/2 z-20">
                <MapTimeBar
                    selectedHour={selectedHour}
                    setSelectedHour={setSelectedHour}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
            </div>

            <div className="absolute top-5 right-[830px] translate-x-1/2 z-20">
                <MapRegionSelector setSelectedRegion={setSelectedRegion} />
            </div>

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

        </div>
    );
};

export default MapPage;
