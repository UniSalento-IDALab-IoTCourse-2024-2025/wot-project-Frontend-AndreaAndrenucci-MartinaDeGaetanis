import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { home_bg_anim } from '../assets';
import {text_input_lable, text_input_style } from '../styles/styles';
import TablePopUpComponent from '../components/table/TablePopUpComponent';
import { useRegistrationProcessor } from '../hooks/backend';

const VerificationCode = () => {

    const [otpValues, setOtpValues] = useState(Array(6).fill(""));
    const [showPopup, setShowPopup] = useState(false);
    const [showPopUpVerification, setShowPopUpVerification] = useState(false)
    const inputs = useRef([]);

    const navigate = useNavigate();

    const { verification_account, resendVerificationEmail, email, error } = useRegistrationProcessor();
    
    
    const handleVerificationCode = () => {
        const verificationCode = otpValues.join('');
        console.log("Codice di verifica inserito:", verificationCode);

        verification_account(email, verificationCode)
            .then((response) => {
                if (response.success) {
                    setShowPopUpVerification(true)
                }
            })
            .catch((err) => {
                console.error("Errore catturato in handleVerificationCode:", err.message);
            });
    };

    const handleResendEmail = () => {
        resendVerificationEmail(email)
            .then((response) => {
                if (response.success) {
                    setShowPopup(true)
                    setOtpValues(["", "", "", "", "", ""]);
                    inputs.current[0]?.focus();
                }
            })
            .catch((err) => {
                console.error("Errore durante l'invio dell'email di verifica:", err.message);
            });
    }

    const handleForwardChange = (e, idx) => {
        const value = e.target.value;

        console.log("Cifra digitata:", value);

        const newValues = [...otpValues];
        newValues[idx] = value;
        setOtpValues(newValues);

        if (value && idx < inputs.current.length - 1) {
            inputs.current[idx + 1].focus();
        }
    };

    const handleBackwardChange = (e, idx) => {
        if (e.key === "Backspace" && !e.target.value && idx > 0) {
            inputs.current[idx - 1].focus();
        }
    };



    return (
        <div className='sansation flex flex-row h-screen w-full z-0'>
            <div className='absolute right-0 h-screen w-full z-0 bg-tertiary' />
            <img src={home_bg_anim} className='absolute blur-[10px] object-cover right-0 h-screen w-full z-0' />
            <div className='absolute right-0 h-screen w-full z-0 bg-tertiary opacity-[10%]' />
            <div className='z-10 flex justify-center w-full h-full pt-32'>
                <div className='flex flex-col items-center h-[480px] aspect-square bg-glass rounded-2xl shadow-sm pt-6 px-10'>
                    <div className="flex items-start justify-center w-full h-auto">
                        <form className="w-full p-6" onSubmit={(e) => {e.preventDefault(); handleVerificationCode();}}>
                            <h2 className="mb-4 text-3xl font-bold text-secondary pb-5 text-center">Conferma l'account</h2>
                            <div className="mb-10">
                                <label className="block w-full text-white text-lg font-thin text-center">
                                    Abbiamo inviato un codice di verifica al tuo indirizzo email. Inserisci qui il codice a 6 cifre per confermare il tuo account.
                                </label>
                            </div>
                            <div className="flex justify-center space-x-4 mb-1">
                                {otpValues.map((val, idx) => (
                                    <input
                                        key={idx}
                                        type="text"
                                        maxLength={1}
                                        value={val}
                                        ref={(el) => (inputs.current[idx] = el)}
                                        onChange={(e) => handleForwardChange(e, idx)}
                                        onKeyDown={(e) => handleBackwardChange(e, idx)}
                                        className="otp-input"
                                        required
                                    />
                                ))}
                            </div>

                            <div className="h-6 flex items-center justify-center">
                                {error.message && (
                                    <p className="text-err-main text-lg text-center">{error.message}</p>
                                )}
                            </div>

                            <button 
                                type="submit" 
                                className={`w-full text-3xl py-2 text-white bg-blue-500 rounded hover:bg-blue-700 hover:text-primary`}
                                >
                                Verifica
                            </button>
                            <TablePopUpComponent
                                formType="verificationCheck"
                                Icon={null}
                                isOpen={showPopUpVerification}
                                onClose={() => setShowPopUpVerification(false)}
                                triggerMode="external"
                            />

                            <div className="flex justify-center items-center mt-4 space-x-2 text-white">
                                <span>Non hai ricevuto il codice?</span>
                                <button
                                    type="button"
                                    onClick={handleResendEmail}
                                    className="text-primary hover:underline transition-colors duration-200"
                                >
                                    Rinvia email
                                </button>
                                <TablePopUpComponent
                                    formType="sendVerificationEmail"
                                    Icon={null}
                                    isOpen={showPopup}
                                    onClose={() => { setShowPopup(false); navigate('/signin'); }}
                                    triggerMode="external"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationCode;
