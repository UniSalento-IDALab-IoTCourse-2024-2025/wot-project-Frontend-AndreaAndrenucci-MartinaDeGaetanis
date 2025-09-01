import React from 'react'
import { TbPasswordUser } from "react-icons/tb";
import {useNavigate } from 'react-router-dom';

const TablePopUpConfirmChangePassword = ({popupRef, onClose}) => {

    const navigate = useNavigate();


    const handleSubmit = () => {
        onClose();
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
                        <TbPasswordUser className="w-[50px] h-[50px] text-gray" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-center">Password modificata</h3>
                    <p className="text-lg text-gray-600 text-center">Effettua il login con la nuova password</p>
                </div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full h-12 px-20 flex justify-center font-semibold text-white items-center border-[1px] bg-primary border-tertiary rounded-lg"
                >
                    Prosegui
                </button>
            </div>
        </div>
    )
}

export default TablePopUpConfirmChangePassword;