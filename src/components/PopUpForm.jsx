import React, { useState, useEffect } from 'react';
import { titlesMap, records_ops } from '../constants/constants';

const PopupForm = ({ isOpen, onClose, onSubmit }) => {
    const loading = false;
    const pollutant = records_ops.ipa;

    const [formData, setFormData] = useState({
        title: titlesMap[records_ops.ipa],
        selectedStartDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        selectedEndDate: new Date().toISOString().split('T')[0],
        type: 'line',
        color: '#36A2EB',
        pollutant: records_ops.ipa
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFetchTypeChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({
            ...prev,
            pollutant: value,
            title: titlesMap[value]
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = {
            ...formData,
            start_date: formData.selectedStartDate,
            finish_date: formData.selectedEndDate
        };
        onSubmit(submitData); 
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="afacad unselectable text-softblack fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Monitoraggio degli Inquinanti</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Seleziona Inquinante</label>
                        <select
                            value={formData.pollutant}
                            onChange={handleFetchTypeChange}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value={records_ops.ipa}>IPA</option>
                            <option value={records_ops.pm10}>PM10</option>
                            <option value={records_ops.pm2dot5}>PM2.5</option>
                            <option value={records_ops.no2}>NO2</option>
                            <option value={records_ops.co}>CO</option>
                            <option value={records_ops.c6h6}>C6H6</option>
                            <option value={records_ops.h2s}>H2S</option>
                            <option value={records_ops.o3}>O3</option>
                            <option value={records_ops.so2}>SO2</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Seleziona data di inizio</label>
                        <input
                            type="date"
                            value={formData.selectedStartDate}
                            onChange={(e) => setFormData(prev => ({ ...prev, selectedStartDate: e.target.value }))}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Seleziona data di fine</label>
                        <input
                            type="date"
                            value={formData.selectedEndDate}
                            onChange={(e) => setFormData(prev => ({ ...prev, selectedEndDate: e.target.value }))}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Tipo di Grafico</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="line">Line</option>
                            <option value="bar">Bar</option>
                            <option value="pie">Pie</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Colore</label>
                        <input
                            type="color"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-3 px-4 py-2 bg-gray-300 rounded-lg"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-lg"
                            disabled={loading}
                        >
                            {loading ? 'Caricamento...' : 'Aggiungi Grafico'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupForm;
