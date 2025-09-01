import React from 'react'

const TablePopUpDeleteDomainForm = ({popupRef, onClose, onConfirm}) => {

    const handleSubmit = () => {
        onConfirm();
    };

    return (
        <div
            ref={popupRef}
            className="absolute flex justify-center items-center w-full h-screen z-50 unselectable text-white bottom-0 left-0 bg-tertiary bg-opacity-40"
            >
            <div className="w-full text-darkglass afacad text-lg max-w-xl bg-white rounded-3xl shadow-lg p-6">
                <div className="text-center mb-4 flex flex-row justify-between pl-1 pb-2 items-center">
                    <h3 className="text-2xl font-semibold">Vuoi cancellare questo dominio?</h3>
                    <button
                        className="rounded-full w-6 h-6 text-lightgray flex items-center justify-center"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full h-12 px-20 flex justify-center font-semibold text-white items-center border-[1px] bg-primary border-tertiary rounded-lg"
                >
                    Conferma azione
                </button>
            </div>
        </div>
    )
}

export default TablePopUpDeleteDomainForm