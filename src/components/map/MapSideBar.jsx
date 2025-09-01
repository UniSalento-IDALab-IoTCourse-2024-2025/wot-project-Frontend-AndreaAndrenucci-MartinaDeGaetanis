import React, { useState } from 'react'
import { pollutants } from '../../constants/constants';

const MapSideBar = ({handlePollutantSelection}) => {
    const [isHidden, setIsHidden] = useState(true);
    const [activePollutantIndex, setActivePollutantIndex] = useState(0);

    const handlePollutantClick = (index) => {
        setActivePollutantIndex(index);
        handlePollutantSelection(index);
    }
    
    return (
        <div
            className="min-w-[60px] h-full min-h-[500px] flex justify-center items-center unselectable"
            onMouseEnter={() => setIsHidden(false)}
            onMouseLeave={() => setIsHidden(true)}
        >
            <div className={`w-[80px] h-[550px] rounded-lg bg-glass transition-all pt-5 duration-300 ${isHidden ? 'opacity-40' : 'opacity-100'}`}>
                {pollutants.map((pollutant, index) => (
                    <div key={index} className='w-full h-[50px] flex justify-center items-center ' onClick={() => handlePollutantClick(index)}>
                        <SideBarButton isActive={activePollutantIndex === index} label={pollutant.label} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const SideBarButton = ({ label, isActive }) => {
    return (
        <button className={`afacad font-semibold hover:font-bold text-xl w-full flex justify-center items-center text-white ${isActive ? 'opacity-100' : 'opacity-70 '}`}>
            {label}
        </button>
    )
}


export default MapSideBar