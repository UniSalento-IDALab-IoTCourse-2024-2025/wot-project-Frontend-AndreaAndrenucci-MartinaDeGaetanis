import React from 'react'

const TablePopUpEditProfileForm = ({popupRef, onClose, onConfirm}) => {

    const handleSubmit = () => {
        onConfirm();
    };

    return (
        <div
                    ref={popupRef}
                    className="absolute flex justify-center items-center w-full h-screen z-50 unselectable text-white bottom-0 left-0 bg-tertiary bg-opacity-40"
                >
                    <div className="relative w-full text-darkglass afacad text-lg max-w-xl bg-white rounded-3xl shadow-lg p-6">
                        <div className="text-center mb-4">
                            <button
                                className="absolute top-5 right-5 rounded-full w-6 h-6 text-lightgray flex items-center justify-center"
                                onClick={onClose}
                            >
                                ✕
                            </button>
                            <h3 className="text-xl font-semibold mb-2 text-left">Confermi le modifiche al profilo?</h3>
                            <p className="text-lg text-gray-600 text-left">Il profilo verrà aggiornato con le nuove informazioni inserite.<br/> Ti preghiamo di verificare l'accuratezza di tutti i dati prima di procedere con il salvataggio.</p>
                        </div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full h-12 px-20 flex justify-center font-semibold text-white items-center border-[1px] bg-primary border-tertiary rounded-lg"
                        >
                            Salva
                        </button>
                    </div>
                </div>
    )
}

export default TablePopUpEditProfileForm