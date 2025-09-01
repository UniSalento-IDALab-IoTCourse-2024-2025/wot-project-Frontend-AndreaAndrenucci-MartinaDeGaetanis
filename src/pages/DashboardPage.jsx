import React, { useEffect, useState } from 'react';
import DashboardBuilder from '../components/graph-builder/DashboardBuilder';
import { PopupForm } from '../components';
import { usePopup } from '../hooks';
import chroma from 'chroma-js';
import { useNavigate } from 'react-router-dom';
import { useAuthenticationProcessor } from '../hooks/backend/useAuthenticationProcessor';
import { hasPermission, PERMISSIONS } from '../constants/permissions';
import UsersHistogram from '../components/graph-builder/UsersHistogram';
import { useUserProcessor } from '../hooks/backend';
import {TablePopUpComponent} from '../components/table';


const DashboardPage = () => {

    const navigate = useNavigate();
    const {role, authed} = useAuthenticationProcessor();

    const isAdmin = role === 'ADMIN';

    useEffect(() => {
        if (!authed || !hasPermission(role, PERMISSIONS.VIEW_DASHBOARD)) {
            navigate('/');
        }
    }, [authed, role, navigate]);

    const [showPopUPListAffiliatedUsers, setShowPopUpListAffiliatedUsers] = useState(null)
    const [showPopUPListNonAffiliatedUsers, setShowPopUpListNonAffiliatedUsers] = useState(null)
    const [affiliatedCount, setAffiliatedCount] = useState(0);
    const [nonAffiliatedCount, setNonAffiliatedCount] = useState(0);
    const [listNonAffiliatedUsers, setListNonAffiliatedUsers] = useState([]);
    const [listAffiliatedUsers, setListAffiliatedUsers] = useState([]);
    const {getListRegularUsers, getListResearchersUsers} = useUserProcessor();
    
    
    const ListNonAffiliatedUsers = async () => {
        getListRegularUsers()
        .then(response => {
            if (response.success) {
                console.log("Lista degli utenti non affiliati:", response.message);
                setNonAffiliatedCount(response.data.users.length);
                setListNonAffiliatedUsers(response.data.users);
            } else {
                console.error("Errore:", error);
            }
        })
        .catch(err => {
            console.error("Errore durante il recupero degli utenti:", err);
        });
    };
    
    const ListAffiliatedUsers = async () => {
        getListResearchersUsers()
        .then(response => {
            if (response.success) {
                console.log("Lista degli utenti affiliati:", response.message);
                setAffiliatedCount(response.data.users.length);
                setListAffiliatedUsers(response.data.users);
            } else {
                console.error("Errore:", error);
            }
        })
        .catch(err => {
            console.error("Errore durante il recupero degli utenti:", err);
        });
    };
    
    useEffect(() => {
        ListNonAffiliatedUsers();
        ListAffiliatedUsers();
    }, []);


    const [charts, setCharts] = useState(() => {
        const storedCharts = sessionStorage.getItem('charts');
        return storedCharts ? JSON.parse(storedCharts) : [];
    });

    

    const { isOpen, openPopup, closePopup } = usePopup();

    useEffect(() => {
        sessionStorage.setItem('charts', JSON.stringify(charts));
    }, [charts]);    

    const generatePalette = (baseColor, steps) => {
        return chroma.scale([chroma(baseColor).brighten(1), chroma(baseColor).darken(1)])
            .mode('lab')
            .colors(steps);
    };

    const handleAddChart = (chartData) => {
        const palette = generatePalette(chartData.color || '#007BFF', 5);
        const newChartConfig = {
            id: `chart-${charts.length + 1}`,
            title: chartData.title,
            type: chartData.type,
            color: palette,
            pollutant: chartData.pollutant,
            start_date: chartData.start_date,
            finish_date: chartData.finish_date 
        };
    
        setCharts([...charts, newChartConfig]);
    };
    

    const removeChart = (chartId) => {
        const updatedCharts = charts.filter(chart => chart.id !== chartId);
        setCharts(updatedCharts);
    };

    return (
        <div className="sansation p-6 bg-gradient-to-t from-metal to-cyan h-screen overflow-auto">
            {authed &&
                <>
                    {isAdmin && 
                        <>
                       
                            <div className="flex items-center mt-10">
                                <div className="flex-grow border-t-[3px] border-tertiary"></div>
                                    <span className="mx-4 text-tertiary font-bold text-3xl">Distribuzione Utenti</span>
                                <div className="flex-grow border-t-[3px] border-tertiary"></div>
                            </div>
                            <div className="flex items-center gap-[200px] mt-10">
                                {/* Contenitore del grafico a sinistra */}
                                <div className="w-[600px] ml-[100px]">
                                    <UsersHistogram
                                    affiliatedCount={affiliatedCount}
                                    nonAffiliatedCount={nonAffiliatedCount}
                                    />
                                </div>

                                {/* Contenitore dei pulsanti a destra */}
                                <div className="flex flex-col gap-[20px]">
                                    <button
                                        className="bg-tertiary text-white h-16 px-10 rounded-lg shadow-lg w-[310px] cursor-pointer"
                                        onClick={() => setShowPopUpListAffiliatedUsers(true)}
                                    >
                                    Vedi elenco Utenti Affiliati
                                    </button>
                                    <button
                                        className="bg-tertiary text-white h-16 px-10 rounded-lg shadow-lg w-[310px] cursor-pointer"
                                        onClick={() => setShowPopUpListNonAffiliatedUsers(true)}
                                    >
                                    Vedi elenco Utenti Non Affiliati
                                    </button>
                                </div>
                            </div>

                            <TablePopUpComponent
                                formType='listUser'
                                isOpen={showPopUPListAffiliatedUsers}
                                onOpen={() => setShowPopUpListAffiliatedUsers(true)}
                                onClose={() => setShowPopUpListAffiliatedUsers(false)}
                                userList={listAffiliatedUsers}
                                affiliatedList={true}
                                triggerMode="external"
                            />

                            <TablePopUpComponent
                                formType='listUser'
                                isOpen={showPopUPListNonAffiliatedUsers}
                                onOpen={() => setShowPopUpListNonAffiliatedUsers(true)}
                                onClose={() => setShowPopUpListNonAffiliatedUsers(false)}
                                userList={listNonAffiliatedUsers}
                                affiliatedList={false}
                                triggerMode="external"
                            />
                        </>
                    }

                    <div className="flex items-center mt-20">
                        <div className="flex-grow border-t-[3px] border-tertiary"></div>
                            <span className="mx-4 text-tertiary font-bold text-3xl">Monitoraggio Inquinanti</span>
                        <div className="flex-grow border-t-[3px] border-tertiary"></div>
                    </div>

                    <DashboardBuilder charts={charts} openPopup={openPopup} removeChart={removeChart} />
                    <PopupForm
                        isOpen={isOpen}
                        onClose={closePopup}
                        onSubmit={handleAddChart}
                    />
                </>
            }
        </div>
    );
}

        // <div className='w-full h-screen bg-white'>
            
        // </div>
export default DashboardPage