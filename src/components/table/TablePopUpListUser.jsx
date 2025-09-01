import React, { useEffect } from 'react';

const TablePopUpListUser  = ({popupRef, onClose, userList, affiliatedList}) => {
    return (
        <div
            ref={popupRef}
            className="fixed inset-0 flex justify-center items-center z-50 unselectable bg-tertiary bg-opacity-40"
        >
            <div className="relative w-full text-darkglass afacad text-lg max-w-4xl bg-white rounded-3xl shadow-lg p-6 max-h-[80vh] overflow-hidden">
                
                <div className="relative flex items-center justify-center mb-6">
                    <div className="flex items-center gap-2">
                        <p className="text-xl text-gray-600 font-semibold">{affiliatedList ? "Elenco Utenti Affiliati" : "Elenco Utenti Non Affiliati"}</p>
                    </div>
                    <button
                        className="absolute right-0 rounded-full w-8 h-8 text-lightgray flex items-center justify-center transition-colors"
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
                    {userList.map((user, index) => (
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

export default TablePopUpListUser
