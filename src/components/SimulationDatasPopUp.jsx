import React, { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const SimulationDatasPopUp = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    treesNumber, 
    setTreesNumber,
    selectedDate, 
    setSelectedDate,
    selectedHour,
    setSelectedHour,
    loading,
    errMsg = false,
}) => {


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit()
    };

    if (!isOpen) return null;

    return (
        <div className="afacad unselectable text-softblack fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Dati Simulazione</h2>
                <form onSubmit={handleSubmit}>
                    
                    {/* Numero alberi */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Seleziona il numero di alberi da simulare
                        </label>
                        <input
                            type='number'
                            name="trees"
                            min={1}
                            value={treesNumber}
                            onChange={(e)=>setTreesNumber(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Seleziona la data</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Seleziona l'ora</label>
                        <input
                            type="time"
                            value={String(selectedHour).padStart(2, '0')+":00"}
                            step="3600"   
                            onChange={(e) => setSelectedHour(parseInt(e.target.value))}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    {errMsg &&
                        <div className='text-err-main opacity-70 flex flex-row gap-2 justify-start text-lg mb-5'>
                                <FaExclamationTriangle/>
                                <p className='text-sm font-semibold pt-[1px]'> {errMsg} </p>  
                        </div>
                    }

                    {loading && (
                        <div className="w-full h-1 mb-5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-secondary via-primary to-secondary animate-bar" />
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => onClose(false)}
                            className="mr-3 px-4 py-2 bg-gray-300 rounded-lg"
                        >
                            Annulla
                        </button>


                        <button
                            type="submit"
                            className={`px-4 py-2 bg-primary text-white rounded-lg ${errMsg == "Selezionare le coordinate" || errMsg == null ? 'bg-opacity-60 cursor-not-allowed' : ''}`}
                            disabled={loading || errMsg == "Selezionare le coordinate" || errMsg == null}
                        >
                            {loading ? 'Caricamento...' : 'Aggiungi Grafico'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SimulationDatasPopUp;
