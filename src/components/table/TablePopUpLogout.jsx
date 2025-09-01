import React from 'react'
import { LuLogOut } from "react-icons/lu";

const TablePopUpLogout = ({popupRef, onClose, onConfirm}) => {

    const handleSubmit = () => {
        onConfirm();
    };

    return (
        <div
            ref={popupRef}
            className="fixed flex justify-center items-center w-full h-screen z-50 unselectable text-white bottom-0 left-0 bg-tertiary bg-opacity-60"
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
                        <LuLogOut className="w-[45px] h-[45px] text-gray" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-center">Sei sicuro di voler uscire?</h3>
                </div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full h-12 px-20 flex justify-center font-semibold text-white items-center border-[1px] bg-[#b03030] border-[#b03030] rounded-lg"                >
                    Conferma
                </button>
            </div>
        </div>
    )
}

export default TablePopUpLogout