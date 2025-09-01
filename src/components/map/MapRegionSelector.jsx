import React, { useEffect, useState } from "react"
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"
import { supportedRegions } from "../../constants/constants"
import { AnimatePresence, motion } from "framer-motion"

const MapRegionSelector = ({setSelectedRegion}) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    const handleArrowClick = (isRight) => {
        setDirection(isRight ? 1 : -1)

        if (isRight && selectedIndex === supportedRegions.length - 1) {
            setSelectedIndex(0)
        } else if (!isRight && selectedIndex === 0) {
            setSelectedIndex(supportedRegions.length - 1)
        } else {
            setSelectedIndex(prev => isRight ? prev + 1 : prev - 1)
        }

    }

    useEffect(()=>{
        setSelectedRegion(supportedRegions[selectedIndex])
    },[selectedIndex])

    return (
        <div className="min-w-[300px] unselectable flex flex-row text-3xl items-center justify-between font-bold gap-3 text-primary overflow-hidden">
            <MdOutlineKeyboardDoubleArrowLeft onClick={() => handleArrowClick(false)} className="cursor-pointer"/>
            
            <div className="text-2xl w-[150px] h-[40px] relative overflow-hidden flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={supportedRegions[selectedIndex].region}
                        custom={direction}
                        initial={{ x: direction > 0  ? 100 : -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction > 0  ? -100 : 100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute"
                    >
                        {supportedRegions[selectedIndex].region}
                    </motion.div>
                </AnimatePresence>
            </div>

            <MdOutlineKeyboardDoubleArrowRight onClick={() => handleArrowClick(true)} className="cursor-pointer"/>
        </div>
    )
}

export default MapRegionSelector