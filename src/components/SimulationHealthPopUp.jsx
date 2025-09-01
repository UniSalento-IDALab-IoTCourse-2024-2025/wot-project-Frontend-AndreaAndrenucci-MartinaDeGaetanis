import React, { useState, useEffect } from 'react';

const SimulationHealthPopUp = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    selectedDate, 
    setSelectedDate,
    loading,
}) => {


    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (isOpen) {
            setSelectedDate(new Date().toISOString().split('T')[0]);
        }
    }, [isOpen]);

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

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Seleziona la data</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    {loading && (
                        <div className="w-full h-1 mb-5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-secondary via-primary to-secondary animate-bar" />
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                onClose(false);
                                setSelectedDate(new Date().toISOString().split('T')[0]);
                            }}
                            className="mr-3 px-4 py-2 bg-gray-300 rounded-lg"
                        >
                            Annulla
                        </button>


                        <button
                            type="submit"
                            className={`px-4 py-2 bg-primary text-white rounded-lg ${!selectedDate || selectedDate <= today ? 'bg-opacity-60 cursor-not-allowed' : ''}`}
                            disabled={loading || !selectedDate || selectedDate <= today}
                            >
                            {loading ? 'Caricamento...' : 'Avvia Simulazione'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SimulationHealthPopUp;
