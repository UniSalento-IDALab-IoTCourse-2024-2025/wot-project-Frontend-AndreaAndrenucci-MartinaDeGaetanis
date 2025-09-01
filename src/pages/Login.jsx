import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { home_bg_anim } from '../assets';
import { text_input_lable, text_input_style } from '../styles/styles';
import { PiEyeBold, PiEyeClosed } from "react-icons/pi";
// import { useAuth, useJwt } from '../hooks/backend';
import { useAuthenticationProcessor } from '../hooks/backend';

const Login = () => {
    // const { login, authed, loading, error } = useAuth();
    const { authentication, loading, error } = useAuthenticationProcessor();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (authed) {
    //         const tokenDatas = useJwt();
    
    //         if (!tokenDatas || !tokenDatas.userType) {
    //             return;
    //         }
    
    //         switch (tokenDatas.userType) {
    //             case "admin":
    //                 navigate('/search'); 
    //                 break;
    //             case "fan":
    //                 navigate("/search");
    //                 break;
    //             case "performer":
    //                 navigate("/create-event");
    //                 break;
    //             case "venue":
    //                 navigate("/venue-management");
    //                 break;
    //             default:
    //                 navigate("/user-jwt-not-valid");
    //         }
    //         window.location.reload()
    //     }
    // }, [authed, navigate]);

    const handleLogin = () => {
        authentication(email, password)
            .then(response => {
                if (response.success) {
                    console.log("Login successful:", response.message);
                    navigate('/app/map');
                } else {
                    console.error("Login fallito:", error);
                }
            })
            .catch(err => {
                console.error("Errore durante il login:", err);
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
                        <form className="w-full p-6" onSubmit={(e) => {e.preventDefault(); handleLogin();}}>
                            <h2 className="mb-4 text-3xl font-bold text-secondary pb-8">Login</h2>
                            <div className="mb-4">
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
                            <div className="mb-4 relative">
                                <label htmlFor="password" className={text_input_lable}>Password</label>
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
                            <div className="flex justify-end mt-1">
                                <button
                                    type='button'
                                    className="text-white text-lg font-thin hover:text-primary cursor-pointer"
                                    onClick={() => navigate('/reset-password')}
                                >
                                    Password dimenticata?
                                </button>
                            </div>
                            <div className="h-10 flex items-center justify-center">
                                {error.message && (
                                    <p className="text-err-main text-lg text-center">{error.message}</p>
                                )}
                            </div>

                            <button 
                                type="submit" 
                                className={`w-full text-3xl py-2 text-white bg-blue-500 rounded hover:bg-blue-700 hover:text-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                disabled={loading}
                            >
                                {loading ? 'Caricamento...' : 'Accedi'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
