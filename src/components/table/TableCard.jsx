import React, { useState } from 'react'
import DeviceTableSection from './DeviceTableSection';

const TableCard = ({ lable = null, info = null, imgSrc = null, isActive = false, lastSeen = null, datas = null, objectType = 'device' }) => {
    const [isOpen, setIsOpen] = useState();

    const handleObjectType = () => {
        switch(objectType){
            case 'device':
                return <DeviceTableSection data={datas} id={lable}/>
            default:
                return <div>Bro non so di cosa stai parlando</div>
        }

    }

    return (
        <div className="min-w-[1360px] w-full pt-2 pl-2 pr-4 bg-white border-[1px] border-lightgray shadow-lg ease-in-out duration-300 transition-all">
            <div
                className="cursor-pointer text-md text-glass flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className='flex flex-row gap-32'>
                    <h2 className="mx-10 font-semibold text-tart text-lg min-w-[200px]">{lable || "Lable"}</h2>
                    <h2 className="text-center text-lg ">{info || "Info"}</h2>
                </div>
                <p className={`rounded-full ${isActive ? 'bg-ok-bg' : "bg-err-main opacity-90"} aspect-square w-4 mx-5`}/>
            </div>
            <div
                className={`mt-2 max-h-0 overflow-hidden transition-[max-height] ${isOpen && "max-h-[200px]"}`}
            >
                <div className="pb-8 pl-12">
                    {handleObjectType()}
                </div>
            </div>
        </div>
    );
};
export default TableCard