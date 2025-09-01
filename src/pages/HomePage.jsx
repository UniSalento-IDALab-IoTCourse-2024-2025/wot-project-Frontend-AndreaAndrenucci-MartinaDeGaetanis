import React from 'react'
import { home_bg_anim } from '../assets'

const HomePage = () => {
    return (
        <div className='sansation relative w-full h-screen bg-white overflow-clip'>
            <div className='absolute w-full h-full bg-softblack'/>
            <img src={home_bg_anim} className='absolute w-screen h-screen object-cover blur-[10px] '/>
            <div className='absolute w-full h-full bg-softblack opacity-40'/>
            <div className='absolute w-full h-full sansation text-[#c5d7c6] flex flex-col justify-center items-center'>
                <img 
                    src='src\assets\DigitAIR.svg' 
                    alt='Logo' 
                    className='w-200 h-20 mb-4 logo-shadow'
                />
                <h1 className='font-bold text-5xl text-center leading-[4rem] text-shadow'>
                    L'invisibile diventa visibile<br />
                    La qualità dell'aria in tempo reale
                </h1>
            </div>
        </div>
    )
}

export default HomePage