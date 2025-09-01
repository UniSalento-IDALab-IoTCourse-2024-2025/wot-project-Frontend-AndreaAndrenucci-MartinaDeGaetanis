import React, { useEffect, useState } from 'react'
import { text_input_lable, text_input_style } from "../../styles/styles.js"
import useAdminProcessor from '../../hooks/backend/useAdminProcessor'

const TablePopUpAddDomainForm  = ({popupRef, onClose}) => {

    const [accreditedDomain, setAccretedDomain] = useState('');

    const {error, addDomain} = useAdminProcessor();

    const handleAddDomain = () => {
        addDomain(accreditedDomain)
            .then(response => {
                if(response.success){
                    console.log("Il dominio è stato aggiunto con successo")
                    onClose();
                }
            })
            .catch(err =>{
                console.log(err.message || 'Errore durante la creazione del nuovo dominio');
            })
    }

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
                    <h3 className="text-xl font-semibold mb-2 text-center">Aggiungi un nuovo dominio</h3>
                    <p className="text-lg text-gray-600 text-center">Specifica un dominio per espandere la rete di utenti affiliati:</p>
                    <input
                        type="text"
                        id="newDomain"
                        onChange={(e) => setAccretedDomain(e.target.value)}
                        value={accreditedDomain}
                        className='w-full px-3 form-field text-gray text-md border-b-[1px]'
                        required
                    />
                </div>
                <button
                    type="button"
                    onClick={handleAddDomain}
                    disabled={!accreditedDomain.trim()}
                    className={`w-full h-12 px-20 flex justify-center font-semibold items-center border-[1px] rounded-lg
                        ${accreditedDomain.trim() 
                            ? "bg-tertiary text-white border-tertiary cursor-pointer" 
                            : "bg-tertiary text-secondary border-secondary bg-opacity-60 cursor-not-allowed"
                        }`}
                >
                    Salva
                </button>
            </div>
        </div>
    )
}

export default TablePopUpAddDomainForm
