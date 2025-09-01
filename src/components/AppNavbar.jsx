import React, { useState, useEffect } from 'react'
import { app_admin_navlinks, app_navlinks, affiliated_users_navlinks} from '../constants/constants'
import { navbar_icons_style } from '../styles/icons-style'
import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { useAuthenticationProcessor } from '../hooks/backend'
import {TablePopUpComponent} from '../components/table';
import { getSimulationState } from '../constants/simulationManager';


const AppNavbar = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const navigate = useNavigate()

    const [showPopUpLogout, setShowPopUpLogout] = useState(false)

    const {role, logout} = useAuthenticationProcessor();
    const isAdmin = role === 'ADMIN';

    const isAffiliated = role === 'RESEARCHER';
    const navlinks = app_navlinks.concat(
        isAffiliated ? affiliated_users_navlinks : [], 
        isAdmin ? app_admin_navlinks : []
    )

    const handleNavigation = (index, path) => {
        setActiveIndex(index)
        console.log(path)
        navigate(path)
    }

    const handleLogout = () => {
        logout();
        navigate('/home');
    }

    
    const [inProgress, setInProgress] = useState(() => getSimulationState().inProgress);
    const [active, setActive] = useState(() => getSimulationState().active);

    useEffect(() => {
        const handleStateChange = (event) => {
            const { inProgress, active } = event.detail;
            setInProgress(inProgress);
            setActive(active);
            console.log("Simulation state changed: ", { inProgress, active });
        };

        // Ascolta per i cambiamenti
        window.addEventListener("simulationStateChanged", handleStateChange);
        return () => window.removeEventListener("simulationStateChanged", handleStateChange);
    }, []);



    const userIconIndex = navlinks.length + 1;

    return (
        <>
        <div className='w-[8%] h-screen fixed left-0 top-0 bg-primary flex justify-center'>
            <div className="pt-20 w-full text-2xl flex flex-col justify-between h-full">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-[1px] bg-secondary mb-5" />
                    {navlinks.map((navlink, index) => (
                        <div
                            className={`${navbar_icons_style} ${index === activeIndex ? "bg-tertiary z-30" : "z-0"}`}
                            onClick={() => handleNavigation(index, navlink.link)}
                            key={index}
                            alt={navlink.link}
                        >
                            <navlink.icon />

                            {/* Aggiunta del pallino rosso per notificare che sono pronti i risultati della simulazione */}
                            <div className="relative">
                                {navlink.link === "/app/health-simulations" && !inProgress && active && (
                                    <span className="absolute top-0 right-0 w-3 h-3 bg-err-main rounded-full border border-white" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center mb-10">
                    {!isAdmin && (
                        <div
                            className={`${navbar_icons_style} ${activeIndex === userIconIndex ? "bg-tertiary z-30" : "z-0"}`}
                            onClick={() => handleNavigation(userIconIndex, "/app/profile-settings")} 
                        >
                            <FaUserCircle/>
                        </div>
                    )}
                    <div className={navbar_icons_style} onClick={() => setShowPopUpLogout(true)}>
                        <FaSignOutAlt />
                    </div>

                </div>
            </div>

        </div>

            <TablePopUpComponent
                formType="logout"
                Icon={null}
                isOpen={showPopUpLogout}
                onClose={() => {
                    setShowPopUpLogout(false)
                } }
                onConfirm={handleLogout}
                triggerMode="external"
            />
        </>
    )
}

export default AppNavbar