import React from 'react'
import { BsPersonCheck } from "react-icons/bs";
import {useNavigate } from 'react-router-dom';

const TablePopUpVerificationCheck = ({popupRef, onClose}) => {

    const navigate = useNavigate();


    const handleSubmit = () => {
        onClose();
        navigate("/signin")
    };

    return (
        <div
            ref={popupRef}
            className="absolute flex justify-center items-center w-full h-screen z-50 unselectable text-white bottom-0 left-0 bg-tertiary bg-opacity-40"
        >
            <div className="relative w-full text-darkglass afacad text-lg max-w-sm bg-white rounded-3xl shadow-lg p-6">
                <div className="text-center mb-4">
                    <button
                        className="absolute top-5 right-5 rounded-full w-6 h-6 text-lightgray flex items-center justify-center"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                    <div className="flex justify-center mb-2">
                        <BsPersonCheck className="w-[45px] h-[45px] text-gray" />
                    </div>
                    <p className="text-lg text-gray-600 text-center">La verifica del tuo account è stata completata con successo</p>
                </div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full h-12 px-20 flex justify-center font-semibold text-white items-center border-[1px] bg-primary border-tertiary rounded-lg"
                >
                    Accedi
                </button>
            </div>
        </div>
    )
}

export default TablePopUpVerificationCheck;