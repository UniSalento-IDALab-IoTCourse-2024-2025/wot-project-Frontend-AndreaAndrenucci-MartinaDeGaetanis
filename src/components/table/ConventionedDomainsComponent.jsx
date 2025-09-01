import React, { useEffect, useState } from 'react'
import {TablePopUpComponent} from './'
import { FaPlusCircle } from 'react-icons/fa'
import useAdminProcessor from '../../hooks/backend/useAdminProcessor'

const ConventionedDomainsComponent = () => {

    const [showPopupAdd, setShowPopupAdd] = useState(false);
    const [showPopupDelete, setShowPopupDelete] = useState(null);
    const [showPopUPListUsers, setShowPopUpListUsers] = useState(null)
    const [domainList, setDomainList] = useState([]);


    const {error, getAllDomains, deleteDomain} = useAdminProcessor();

    useEffect(() => {
        getAllDomains()
            .then(response =>{
                setDomainList(response.data.accreditedDomainList)
            })
            .catch(err =>{
                 console.log(err.message || 'Errore durante il recupero dei domini accreditati');
            })        
    }, [showPopupAdd, showPopupDelete])


    const handleDeleteDomain = (domainToDelete) => {
        deleteDomain(domainToDelete)
            .then(response => {
                if(response.success) {
                    console.log("Il dominio è stato eliminato correttamente")
                    setShowPopupDelete(null)                
                } else {
                    console.error(response.message || 'Errore durante l\'eliminazione del dominio')
                }
            })
            .catch(err =>{
                 console.log(err.message || 'Errore durante l\'eliminazione del dominio');
            }) 
    }


    return (
        <div className='w-full h-full'>
            {domainList.map((dom, index)=>(
                <div 
                    className='min-w-full px-10 h-10 border-b-[1px] border-lightgray bg-white flex items-center justify-between text-softblack'
                    key={index}
                >
                    <div className='flex w-[400px] items-center justify-between'>
                        <h2 className='font-semibold'>{dom.accreditedDomain}</h2>
                        <p className='w-15 text-glass flex justify-center'>{dom.numClients} utenti</p>
                    </div>

                    <div className='flex items-center'>
                        {dom.numClients > 0 && (
                            <button 
                                className='text-tertiary font-bold hover:text-glass'
                                onClick={() => setShowPopUpListUsers(index)}
                            >
                                Vedi lista utenti
                            </button>
                        )}
                    </div>

                    <TablePopUpComponent
                        formType='deleteDomain'
                        isOpen={showPopupDelete === index}
                        onOpen={() => setShowPopupDelete(index)}
                        onClose={() => setShowPopupDelete(null)}
                        onConfirm={() => handleDeleteDomain(dom.accreditedDomain)}
                        triggerMode="icon"
                    />
                </div>
            ))}

            
            {domainList.map((dom, index) => (
                <TablePopUpComponent
                    formType='listUserDomain'
                    isOpen={showPopUPListUsers === index}
                    onOpen={() => setShowPopUpListUsers(index)}
                    onClose={() => setShowPopUpListUsers(null)}
                    accreditedDomain={dom.accreditedDomain}
                    triggerMode="external"
                />
            ))}


            <div className='w-full py-2 flex justify-end px-10'>
                <TablePopUpComponent
                    iconColor="glass"
                    Icon={FaPlusCircle}
                    formType="addDomain"
                    isOpen={showPopupAdd}
                    onOpen={() => setShowPopupAdd(true)}
                    onClose={() => setShowPopupAdd(false)}
                    triggerMode="icon"
                />
            </div>
        </div>
    )
}

export default ConventionedDomainsComponent