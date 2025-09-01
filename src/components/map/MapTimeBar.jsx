import React, { useState } from 'react';
import "../../styles/custom-input-bar.css"

const MapTimeBar = ({ selectedHour, setSelectedHour, selectedDate, setSelectedDate }) => {
    const [isHidden, setIsHidden] = useState(true);
    
    return (
        <div 
            className={`absolute bottom-0 left-0 w-full z-30 bg-glass rounded-lg text-white p-4 flex justify-between items-center gap-4 transition-all duration-300 ${isHidden ? 'opacity-40' : 'opacity-100'}`}
            onMouseEnter={() => setIsHidden(false)}
            onMouseLeave={() => setIsHidden(true)}
        >
            <div className="flex items-center gap-4 w-full max-w-[700px] mx-auto">
                <label htmlFor="hourRange" className="text-sm min-w-[60px]">
                    {String(selectedHour).padStart(2, '0')}:00
                </label>
                <input
                    id="hourRange"
                    type="range"
                    min="0"
                    max="23"
                    step="1"
                    value={selectedHour}
                    onChange={(e) => setSelectedHour(parseInt(e.target.value))}
                    className="w-full accent-white"
                />
            </div>

            <div className="flex items-center gap-2">
                <label htmlFor="datePicker" className="text-sm">Data:</label>
                <input
                    id="datePicker"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="text-black rounded px-2 py-1"
                />
            </div>
        </div>
    );
};

export default MapTimeBar;
