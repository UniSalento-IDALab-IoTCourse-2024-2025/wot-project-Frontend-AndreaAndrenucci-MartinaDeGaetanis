import React, { useState } from 'react'
import { adminTableIndexes } from '../../constants/constants';
import { management_table_navlink } from '../../styles/styles'
// import { useJwt } from '../../hooks/backend';


const TableNavbar = ({ setActiveIndex, isIndexActive }) => {
    // const token = useJwt();


    return (
        <div className='w-11/12 min-h-10 rounded-t-lg bg-primary flex-row flex items-center justify-start text-white'>
            { 
                adminTableIndexes.map((tableIndex, index) => (
                    <TableNavlinkButton 
                        tableIndex = {tableIndex} 
                        index = {index}
                        key={index} 
                        setActiveIndex={setActiveIndex}
                        isIndexActive={isIndexActive}
                    />
                ))
            }
        </div>
    )
}


const TableNavlinkButton = ({tableIndex, index, setActiveIndex, isIndexActive }) => {
    const [hoveredIcon, setHoveredIcon] = useState(null);
    
    return (
        <div
                    className={`
                    ${management_table_navlink}
                    ${index == 0 && 'rounded-tl-[7px]'}
                    ${isIndexActive== index ? 'w-32 bg-tertiary' : 'w-20'}
                    `}
                        onMouseEnter={() => setHoveredIcon(tableIndex.lable)}
                        onMouseLeave={() => setHoveredIcon(null)}
                        onClick={() => setActiveIndex(index)}
                    >
                        <tableIndex.icon />
                        {(hoveredIcon == tableIndex.lable || isIndexActive== index) && <span className="ml-2 text-md font-semibold cursor-pointer">{tableIndex.lable}</span>}
                    </div>
    )
}

export default TableNavbar