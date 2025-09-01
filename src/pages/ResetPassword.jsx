import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { home_bg_anim } from '../assets';
import { text_input_lable, text_input_style } from '../styles/styles';
import { useAuthenticationProcessor } from '../hooks/backend';
import TablePopUpComponent from '../components/table/TablePopUpComponent';

const ResetPassword = () => {

    const {forgot_password, error } = useAuthenticationProcessor();
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = () => {
        forgot_password(email)
            .then(response => {
                if (response.success) {
                    console.log("Email inviata con successo:", response.message);
                    setShowPopup(true);
                } else {
                    console.error("Errore durante l'invio dell'email:", error.message);
                }
            })
            .catch(err => {
                console.error("Errore durante l'invio dell'email:", err);
            });
    }

    return (
        <div className='sansation flex flex-row h-screen w-full z-0'>
            <div className='absolute right-0 h-screen w-full z-0 bg-tertiary' />
            <img src={home_bg_anim} className='absolute blur-[10px] object-cover right-0 h-screen w-full z-0' />
            <div className='absolute right-0 h-screen w-full z-0 bg-tertiary opacity-[10%]' />
            <div className='z-10 flex justify-center w-full h-full pt-32'>
                <div className='flex flex-col items-center h-[480px] aspect-square bg-glass rounded-2xl shadow-sm pt-6 px-10'>
                    <div className="flex items-start justify-center w-full h-auto">
                        <form className="w-full p-6" onSubmit={(e) => {e.preventDefault(); handleResetPassword}}>
                            <h2 className="mb-4 text-3xl font-bold text-secondary pb-5 text-center">Password dimenticata?</h2>
                            <div className="mb-8">
                                <label className="block w-full text-white text-lg font-thin text-center">
                                    Inserisci il tuo indirizzo email per ricevere le istruzioni per reimpostare la password.
                                    Se esiste un account associato a questo indirizzo, riceverai un'email con il link per procedere alla reimpostazione.
                                </label>
                            </div>
                            <div>
                                <label htmlFor="email" className={text_input_lable}>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className={text_input_style}
                                    required
                                />
                            </div>

                            <div className="h-8 flex items-center justify-center">
                                {error.message && (
                                    <p className="text-err-main text-lg text-center">{error.message}</p>
                                )}
                            </div>

                            <button 
                                type="submit"
                                onClick={handleResetPassword}
                                className={`w-full text-2xl py-2 text-white bg-blue-500 rounded hover:bg-blue-700 hover:text-primary `} 
                                >
                                Ricevi email
                            </button>
                            <TablePopUpComponent
                                formType="sendResetPasswordEmail"
                                Icon={null}
                                isOpen={showPopup}
                                onClose={() => {
                                    setShowPopup(false);
                                    navigate('/signin');
                                }}
                                triggerMode="external"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
