import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { home_bg_anim } from '../assets';
import { PiEyeBold, PiEyeClosed } from "react-icons/pi";
import { text_input_lable, text_input_style } from '../styles/styles';

import { useRegistrationProcessor } from '../hooks/backend';

const Registration = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState('REGULAR');
    const navigate = useNavigate();

    const { registration, loading, error } = useRegistrationProcessor();


    const handleRegistration = () => {
        registration(name, surname, email, password, userType)
            .then((response) => {
                if (response.success) {
                    navigate('/verification');
                }
            })
            .catch((err) => {
                console.error("Registration failed:", err);
            });
    }

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setUserType("RESEARCHER");
        } else {
            setUserType("REGULAR");
        }
    };

    return (
        <div className='sansation flex flex-row h-screen w-full z-0'>
            <div className='absolute right-0 h-screen w-full z-0 bg-tertiary' />
            <img src={home_bg_anim} className='absolute blur-[10px] object-cover right-0 h-screen w-full z-0' />
            <div className='absolute right-0 h-screen w-full z-0 bg-tertiary opacity-[10%]' />
            <div className='z-10 flex justify-center w-full h-full pt-32'>
                <div className='flex flex-col items-center h-[490px] w-[900px] bg-glass rounded-2xl shadow-sm pt-6 px-10'>
                    <div className="flex items-start justify-center w-full h-auto">
                        <form className="w-full p-6" onSubmit={(e) => {e.preventDefault(); handleRegistration();}}>
                            <h2 className="mb-4 text-3xl font-bold text-secondary pb-8">Registrazione</h2>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="mb-4">
                                    <label htmlFor="name" className={text_input_lable}>Nome*</label>
                                    <input
                                        type="text"
                                        id="name"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        className={text_input_style}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="surname" className={text_input_lable}>Cognome*</label>
                                    <input
                                        type="text"
                                        id="surname"
                                        onChange={(e) => setSurname(e.target.value)}
                                        value={surname}
                                        className={text_input_style}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label htmlFor="email" className={text_input_lable}>Email*</label>
                                    <input
                                        type="email"
                                        id="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        className={text_input_style}
                                        required
                                    />
                                </div>
                                <div className="mb-4 relative">
                                    <label htmlFor="password" className={text_input_lable}>Password*</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        className={text_input_style}
                                        required
                                    />
                                    <span
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-4 bottom-2 cursor-pointer text-white"
                                    >
                                        {showPassword ? <PiEyeClosed className="w-[35px] h-[35px]"/> : <PiEyeBold className="w-[35px] h-[35px]"/>}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                                <input
                                    type="checkbox"
                                    id="register_as_researcher"
                                    name="register_as_researcher"
                                    className="h-5 w-5 rounded pointer text-glass cursor-pointer"
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="register_as_researcher"
                                    className="w-full form-field text-white text-md font-thin">
                                    Desidero registrarmi come Utente Affiliato
                                </label>
                            </div>

                            <div className="h-8 flex items-center justify-center">
                                {Object.keys(error.fields).length > 0 ? (
                                    Object.entries(error.fields).map(([field, msg]) => (
                                        <p key={field} className="text-err-main text-lg text-center">{msg}</p>
                                    ))
                                ) : (
                                    error.message && (
                                        <p className="text-err-main text-lg text-center">{error.message}</p>
                                    )
                                )}
                            </div>

                            <button 
                                type="submit" 
                                className={`w-full text-3xl py-2 text-white bg-blue-500 rounded hover:bg-blue-700 hover:text-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                disabled={loading}
                            >
                                {loading ? 'Caricamento...' : 'Registrati'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
