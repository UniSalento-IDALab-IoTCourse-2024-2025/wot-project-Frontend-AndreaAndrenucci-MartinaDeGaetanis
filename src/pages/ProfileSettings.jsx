import React, { useState, useEffect, useRef } from 'react';
import { PiUserCircleGearBold, PiUserCircleBold} from "react-icons/pi";
import { PiEyeClosed, PiEyeBold  } from "react-icons/pi";
import { RiPencilFill } from "react-icons/ri";
import {TablePopUpComponent} from '../components/table';
import { useNavigate } from 'react-router-dom';
import { useAuthenticationProcessor } from '../hooks/backend/useAuthenticationProcessor';
import { hasPermission, PERMISSIONS } from '../constants/permissions';
import useUserProcessor from '../hooks/backend/useUserProcessor';


const ProfileSettings = () => {

    const navigate = useNavigate();
    const {role, authed, email} = useAuthenticationProcessor();

    useEffect(() => {
        if (!authed || !hasPermission(role, PERMISSIONS.PROFILE_SETTINGS)) {
            navigate('/');
        }
    }, [authed, role, navigate]);

    const nameRef = useRef(null);
    const surnameRef = useRef(null);
    const emailRef = useRef(null);

    const [name, setName] = useState('');
    const [surname , setSurname] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [userType, setUserType] = useState('');
    const [errorEditProfile, setErrorEditProfile] = useState('');
    const [isAffiliated, setIsAffiliated] = useState(true);
    const [editField, setEditField] = useState(false);
    const [hasChangedUserType, setHasChangedUserType] = useState(false);
    const [hasConfirmedEdit, setHasConfirmedEdit] = useState(false);
    const [showPopupEditProfile, setShowPopupEditProfile] = useState(false);


    const [oldPassword, setOldPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPopupEditPassword, setShowPopupEditPassword] = useState(false);
    const [showPopupConfirmChangePassword, setShowPopupConfirmChangePassword] = useState(false);
    const [errorChangePassword, setErrorChangePassword] = useState('');

    const [showPopupDeleteProfile, setShowPopupDeleteProfile] = useState(false);
    const [errorDeleteProfile, setErrorDeleteProfile] = useState('')


    useEffect(() => {
        console.log("editField", editField, "hasChangedUserType", hasChangedUserType);
        if (editField || hasChangedUserType) {
            setHasConfirmedEdit(false);
        }
    }, [editField, hasChangedUserType]);

    
    const {error, getUserFromEmail, updateUserProfile, changePassword, deleteProfile} = useUserProcessor();

    const fetchUserData = async () => {
        if (!email) return;
        
        try {
            const response = await getUserFromEmail(email);
            if (response.success && response.data) {
                setName(response.data.name || '');
                setSurname(response.data.surname || '');
                setEmailUser(response.data.email || '');
                setUserType(response.data.userType || '');
            }
        } catch (err) {
            console.error("Error fetching user data:", err);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [email]);


    useEffect(() => {
        if (userType === 'RESEARCHER') {
            setIsAffiliated(true);
        } else if (userType === 'REGULAR') {
            setIsAffiliated(false);
        }
    }, [userType]); 

    const handleEditProfile = () => {
        const updatedUserType = isAffiliated ? 'RESEARCHER' : 'REGULAR';
        setErrorEditProfile('')

        updateUserProfile(name, surname, emailUser, updatedUserType)
            .then(response => {
                if (response.success) {
                    setHasConfirmedEdit(false);
                    setEditField(false);
                    setHasChangedUserType(false);
                    setShowPopupEditProfile(false);
                    console.log("Profilo aggiornato con successo");
                }
            })
            .catch(err => {
                console.log(err.message || 'Errore durante l\'aggiornamento del profilo');
                setErrorEditProfile(err.message);
                fetchUserData();
                setHasConfirmedEdit(false);
                setEditField(false);
                setHasChangedUserType(false);
                setIsAffiliated(!isAffiliated)
            })
            .finally(() => {
                setShowPopupEditProfile(false);
            });

    };

    const handleChangePassword = () => {
        setErrorChangePassword('')

        changePassword(oldPassword, newPassword, confirmPassword)
            .then(response => {
                if (response.success) {
                    setShowPopupEditPassword(false);

                    setTimeout(() => {
                        setShowPopupConfirmChangePassword(true);
                    }, 1000);
                }
            })
            .catch(err => {
                console.log(err.message || 'Errore durante il cambio della password');
                setErrorChangePassword(err.message);
            })
            .finally(() => {
                setShowPopupEditPassword(false);
            });
    };


    const handleDeleteProfile = () => {
        deleteProfile()
            .then(response =>{
                if (response.success){
                    setShowPopupDeleteProfile(false);
                    navigate('/home')
                }
            })
            .catch(err => {
                console.log(err.message || 'Errore durante l\'eliminazione del profilo');
                setErrorDeleteProfile(err.message);
            })
            .finally(() => {
                setShowPopupDeleteProfile(false);
            });
    }

    return (
        <div className='sansation h-screen w-full flex flex-col pt-16 pl-20 pr-20 overflow-auto'>
            <div className="flex items-center">
                <div className="flex-grow border-t-[3px] border-tertiary"></div>
                <span className="mx-4 text-tertiary font-bold text-3xl">Informazioni Profilo</span>
                <div className="flex-grow border-t-[3px] border-tertiary"></div>
            </div>
            <div className="mt-[60px] grid grid-cols-2 gap-10">
                <div className="mb-4 pl-10 relative w-full">
                    <label htmlFor="name"
                        className="sansation block text-lg font-semibold text-tertiary w-[100px] mb-1">
                        Nome
                    </label>
                    <input
                        type="text"
                        id="name"
                        ref={nameRef}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        disabled={editField !== 'name'}
                        className={`w-full px-3 form-field text-glass text-sm font-medium border-b-[1px] ${editField === 'name' ? 'bg-white' : 'bg-transparent cursor-not-allowed'}`}          
                    />
                    <RiPencilFill
                        className="absolute w-[25px] h-[25px] right-3 top-9 cursor-pointer text-glass hover:text-tertiary transition-transform duration-500 ease-in-out hover:scale-125"
                        size={18}
                        onClick={() => {
                            setEditField('name');
                            nameRef.current?.focus();
                        }}
                        aria-label="Modifica nome"
                    />
                </div>
                <div className="mb-4 pr-10 relative w-full">
                    <label htmlFor="surname" className="sansation block text-lg font-semibold text-tertiary w-[100px] mb-1">Cognome</label>
                    <input
                        type="text"
                        id="surname"
                        ref={surnameRef}
                        onChange={(e) => setSurname(e.target.value)}
                        value={surname}
                        disabled={editField !== 'surname'}
                        className={`w-full px-3 form-field text-glass text-sm font-medium border-b-[1px] ${editField === 'surname' ? 'bg-white' : 'bg-transparent cursor-not-allowed'}`}
                    />
                    <RiPencilFill
                        className="absolute w-[25px] h-[25px] right-12 top-9 cursor-pointer text-glass hover:text-tertiary transition-transform duration-500 ease-in-out hover:scale-125"
                        size={18}
                        onClick={() => {
                            setEditField('surname');
                            emailRef.current?.focus();
                        }}                        
                        aria-label="Modifica cognome"
                    />
                </div>
            </div>
            <div className="mb-4 pl-10 pr-10 relative w-full">
                <label htmlFor="email" className="sansation block text-lg font-semibold text-tertiary w-[100px]">Email</label>
                <input
                    type="text"
                    id="email"
                    ref={emailRef}
                    onChange={(e) => setEmail(e.target.value)}
                    value={emailUser}
                    disabled={editField !== 'email'}
                    className={`w-full px-3 form-field text-glass text-sm font-medium border-b-[1px] ${editField === 'email' ? 'bg-white' : 'bg-transparent cursor-not-allowed'}`}
                />
                <RiPencilFill
                    className="absolute w-[25px] h-[25px] right-12 top-9 cursor-pointer text-glass hover:text-tertiary transition-transform duration-500 ease-in-out hover:scale-125"
                    size={18}
                    onClick={() => {
                        setEditField('email');
                        emailRef.current?.focus();
                    }}
                    aria-label="Modifica email"
                />
            </div>
            <h3 class="mb-5 text-lg font-semibold text-tertiary pl-10 pt-5">Tipologia di utente:</h3>
                <ul className="grid w-full gap-6 grid-cols-2 px-10">
                    <li>
                        <input
                        type="radio"
                        id="affiliated-option"
                        name="user-type"
                        className="hidden peer"
                        checked={isAffiliated}
                        onChange={() => {
                            setIsAffiliated(true);
                            setHasChangedUserType(true);
                        }}                        
                        />
                        <label
                            htmlFor="affiliated-option"
                            className="card-label"
                        >
                        <div className="grid grid-cols-[auto,1fr] gap-5 items-center">
                            <div>
                                <PiUserCircleGearBold className="w-[50px] h-[50px]" />
                            </div>
                            <div>
                            <div className="text-lg font-semibold">Utente affiliato</div>
                            <div className="text-sm">Se il dominio della tua email è accreditato, avrai accesso a vantaggi esclusivi come mappa interattiva, analisi ambientali e simulazioni sulla qualità dell’aria in Puglia</div>
                            </div>
                        </div>
                        </label>
                    </li>
                    <li>
                        <input
                        type="radio"
                        id="non-affiliated-option"
                        name="user-type"
                        className="hidden peer"
                        checked={!isAffiliated}
                        onChange={() => {
                            setIsAffiliated(false);
                            setHasChangedUserType(true);
                        }}                        
                        />
                        <label
                        htmlFor="non-affiliated-option"
                        className="card-label"
                        >
                        <div className="grid grid-cols-[auto,1fr] gap-5 items-center">
                            <div>
                            <PiUserCircleBold className="w-[50px] h-[50px]" />
                            </div>
                            <div>
                            <div className="text-lg font-semibold">Utente non affiliato</div>
                            <div className="text-sm text-gray-600">
                                Gli utenti senza dominio istituzionale verificato possono accedere alla mappa interattiva e ai dati ambientali, ma non alle funzionalità avanzate come le simulazioni predittive</div>
                            </div>
                        </div>
                        </label>
                    </li>
                    </ul>

                    <div className="min-h-8 flex items-center justify-center">
                        {errorEditProfile && (
                            <p className="text-err-main text-lg text-center mt-4">{errorEditProfile}</p>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <button
                            className={`settings-profile-button ${(!editField && !hasChangedUserType) ||  hasConfirmedEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={(!editField && !hasChangedUserType) || hasConfirmedEdit}
                            onClick={() => setShowPopupEditProfile(true)}
                        >
                            Modifica Profilo
                        </button>
                    </div>

                    <TablePopUpComponent
                        formType="editProfile"
                        Icon={null}
                        isOpen={showPopupEditProfile}
                        onClose={() => setShowPopupEditProfile(false)}
                        onConfirm={handleEditProfile}
                        triggerMode="external"
                    />

                    <h1 className="mt-8 text-3xl font-bold text-tertiary pb-8">Cambia Password</h1>              
                        <div className="mb-4 pl-10 relative">
                            <label htmlFor="old-password" className="sansation block text-lg font-semibold text-tertiary w-[200px] mb-1">Vecchia Password</label>
                            <input
                                type={showOldPassword ? "text" : "password"}
                                id="old-password"
                                onChange={(e) => setOldPassword(e.target.value)}
                                value={oldPassword}
                                className="w-full px-3 form-field text-glass text-sm font-medium border-b-[1px]"
                            />
                            <span
                                onClick={() => setShowOldPassword((prev) => !prev)}
                                className="absolute right-4 bottom-2 cursor-pointer text-tertiary"
                            >
                                {showOldPassword ? <PiEyeClosed className="w-[35px] h-[35px]"/> : <PiEyeBold className="w-[35px] h-[35px]"/>}
                            </span>
                        </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="mb-4 pl-10 relative">
                            <label htmlFor="new-password" className="sansation block text-lg font-semibold text-tertiary w-[200px] mb-1">Nuova Password</label>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                id="new-password"
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                                className="w-full px-3 form-field text-glass text-sm font-medium border-b-[1px]"
                            />
                            <span
                                onClick={() => setShowNewPassword((prev) => !prev)}
                                className="absolute right-4 bottom-2 cursor-pointer text-tertiary"
                            >
                                {showNewPassword ? <PiEyeClosed className="w-[35px] h-[35px]"/> : <PiEyeBold className="w-[35px] h-[35px]"/>}
                            </span>
                        </div>
                        <div className="mb-4 pl-10 relative">
                            <label htmlFor="confirm-password" className="sansation block text-lg font-semibold text-tertiary w-[300px] mb-1">Conferma Nuova Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm-password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                className="w-full px-3 form-field text-glass text-sm font-medium border-b-[1px]"
                            />
                            <span
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-4 bottom-2 cursor-pointer text-tertiary"
                            >
                                {showConfirmPassword ? <PiEyeClosed className="w-[35px] h-[35px]"/> : <PiEyeBold className="w-[35px] h-[35px]"/>}
                            </span>
                        </div>
                    </div>

                    <div className="min-h-8 flex items-center justify-center">
                        {errorChangePassword && (
                            <p className="text-err-main text-lg text-center mt-4">{errorChangePassword}</p>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <button className="settings-profile-button" onClick={() => setShowPopupEditPassword(true)}>
                            Cambia Password
                        </button>
                    </div>

                    <TablePopUpComponent
                        formType="editPassword"
                        Icon={null}
                        isOpen={showPopupEditPassword}
                        onClose={() => setShowPopupEditPassword(false)}
                        onConfirm={handleChangePassword}
                        triggerMode="external"
                    />

                    <TablePopUpComponent
                        formType="confirmChangePassword"
                        Icon={null}
                        isOpen={showPopupConfirmChangePassword}
                        onClose={() => {
                            setShowPopupConfirmChangePassword(false);
                            navigate("/signin");
                        }}
                        triggerMode="external"
                    />

                <h1 className="mt-8 text-3xl font-bold text-tertiary pb-8">Elimina Profilo</h1>
                    <p className="text-md text-tertiary pl-10">
                        Premendo questo pulsante il tuo profilo verrà eliminato in modo permanente 
                    </p>

                    <div className="min-h-8 flex items-center justify-center">
                        {errorDeleteProfile && (
                            <p className="text-err-main text-lg text-center mt-4">{errorDeleteProfile}</p>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <button className="delete-profile-button" onClick={() => setShowPopupDeleteProfile(true)}>
                            Elimina Profilo
                        </button>
                    </div>

                    <TablePopUpComponent
                        formType="deleteProfile"
                        Icon={null}
                        isOpen={showPopupDeleteProfile}
                        onClose={() => setShowPopupDeleteProfile(false)}
                        onConfirm={handleDeleteProfile}
                        triggerMode="external"
                    />
        </div>
    );
}

export default ProfileSettings;
