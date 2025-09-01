import React, { useEffect, useState } from 'react'
import useUserProcessor from '../../hooks/backend/useUserProcessor.jsx';

const TablePopUpListUserDomain  = ({popupRef, onClose, accreditedDomain}) => {

    const [users, setUsers] = useState([])

    const {error, getUsersFromDomain} = useUserProcessor();

    useEffect(() => {
        getUsersFromDomain(accreditedDomain)
            .then(response => {
                if(response.success){
                    console.log("La lista degli utenti è stata ottenuta con successo")
                    setUsers(response.data.users);
                } else {
                    console.error(response.message || 'Errore durante il recupero della lista degli utenti');
                }
            })
            .catch(err => {
                console.error(err.message || 'Errore durante il recupero della lista degli utenti');
            })
    }, [accreditedDomain]);

    return (
        <div
            ref={popupRef}
            className="fixed inset-0 flex justify-center items-center z-50 unselectable bg-tertiary bg-opacity-40"
        >
            <div className="relative w-full text-darkglass afacad text-lg max-w-4xl bg-white rounded-3xl shadow-lg p-6 max-h-[80vh] overflow-hidden">
                
                <div className="relative flex items-center justify-center mb-6">
                    <div className="flex items-center gap-2">
                        <p className="text-lg text-gray-600">Lista degli utenti del dominio</p>
                        <h3 className="text-xl font-semibold">{accreditedDomain}</h3>
                    </div>
                    <button
                        className="absolute right-0 rounded-full w-8 h-8 text-lightgray hover:text-gray-800 hover:bg-gray-100 flex items-center justify-center transition-colors"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="border-b-2 border-gray-200 pb-2 mb-4">
                    <div className="flex w-full items-center gap-4 px-4">
                        <div className="font-semibold w-32">Nome</div>
                        <div className="font-semibold w-32">Cognome</div>
                        <div className="font-semibold flex-1">Email</div>
                    </div>
                </div>

                <div className="min-h-12 max-h-96 overflow-y-auto">
                    {users.map((user, index) => (
                        <div 
                            className="min-w-full px-4 h-12 border-b border-lightgray flex items-center text-softblack last:border-b-0"
                            key={index}
                        >
                            <div className="flex w-full items-center gap-4">
                                <h2 className="font-medium w-32 truncate">{user.name}</h2>
                                <p className="text-glass w-32 truncate">{user.surname}</p>
                                <p className="text-glass flex-1 truncate">{user.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-6 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full h-12 px-20 flex justify-center font-semibold text-white items-center border-[1px] bg-primary border-tertiary rounded-lg"
                    >
                        Chiudi
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TablePopUpListUserDomain
