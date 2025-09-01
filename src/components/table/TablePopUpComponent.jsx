import React, { useEffect, useRef, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import TablePopUpDeleteDomainForm from './TablePopUpDeleteDomainForm';
import TablePopUpAddDomainForm from './TablePopUpAddDomainForm';
import TablePopUpEditProfileForm from './TablePopUpEditProfileForm';
import TablePopUpEditPasswordForm from './TablePopUpEditPasswordForm';
import TablePopUpDeleteProfileForm from './TablePopUpDeleteProfileForm';
import TablePopUpSendVerificationEmail from './TablePopUpSendVerificationEmail';
import TablePopUpSendResetPasswordEmail from './TablePopUpSendResetPasswordEmail';
import TablePopUpVerificationCheck from './TablePopUpVerificationCheck';
import TablePopUpConfirmChangePassword from './TablePopUpConfirmChangePassword';
import TablePopUpLogout from './TablePopUpLogout';
import TablePopUpListUserDomain from './TablePopUpListUserDomain';
import TablePopUpListUser from './TablePopUpListUser';

const TablePopUpComponent = ({
    Icon= FaTrash,
    hoverColor = 'text-primary',
    iconColor = 'lightgray',
    formType = 'deleteDomain',
    isOpen = false,
    onOpen = () => {},
    onConfirm = () => {},
    onClose = () => {},
    accreditedDomain,
    userList = [],
    affiliatedList = false,
    triggerMode = 'icon' 
}) => {

    //const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
                //setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const handleFormTypes = () => {
        switch(formType){
            case 'deleteDomain':
                return <TablePopUpDeleteDomainForm popupRef={popupRef} onClose={onClose} onConfirm={onConfirm}/>
            case 'addDomain':
                return <TablePopUpAddDomainForm popupRef={popupRef} onClose={onClose}/>
            case 'listUserDomain':
                return <TablePopUpListUserDomain popupRef={popupRef} onClose={onClose} accreditedDomain={accreditedDomain}/>
            case 'listUser':
                return <TablePopUpListUser popupRef={popupRef} onClose={onClose} userList={userList} affiliatedList={affiliatedList}/>
            case 'editProfile':
                return <TablePopUpEditProfileForm popupRef={popupRef} onClose={onClose} onConfirm={onConfirm}/>
            case 'editPassword':
                return <TablePopUpEditPasswordForm popupRef={popupRef} onClose={onClose} onConfirm={onConfirm}/>
            case 'deleteProfile':
                return <TablePopUpDeleteProfileForm popupRef={popupRef} onClose={onClose} onConfirm={onConfirm}/>
            case 'sendVerificationEmail':
                return <TablePopUpSendVerificationEmail popupRef={popupRef} onClose={onClose}/>
            case 'sendResetPasswordEmail':
                return <TablePopUpSendResetPasswordEmail popupRef={popupRef} onClose={onClose}/>
            case 'verificationCheck':
                return <TablePopUpVerificationCheck popupRef={popupRef} onClose={onClose}/>
            case 'confirmChangePassword':
                return <TablePopUpConfirmChangePassword popupRef={popupRef} onClose={onClose}/>
            case 'logout':
                return <TablePopUpLogout popupRef={popupRef} onClose={onClose} onConfirm={onConfirm}/>
            default:
                console.error("Form type inserito in component non valido")
                return <div/>
        }
    }

    return (
        <div className="px-3 z-50 afacad text-softblack">
            {/* <div
                className={`cursor-pointer relative hover:${hoverColor} text-${iconColor} transition-colors duration-200`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Icon/>
            </div> */}
            {triggerMode === 'icon' && Icon && (
                <div
                    className={`cursor-pointer relative hover:${hoverColor} text-${iconColor} transition-colors duration-200`}
                    onClick={onOpen}
                >
                    <Icon />
                </div>
            )}

            {isOpen && (
                handleFormTypes()
            )}
        </div>
    );
};

export default TablePopUpComponent;
