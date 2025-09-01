import React from 'react'
import { mock_microservices } from '../../constants/mock'
import TableCard from './TableCard'
import Architecture from '../microservices-canvas/Architecture'


const MicroservicesHealthComponent = () => {
    return (

        <div className='unselectable'>
            <Architecture/>
        </div>
        // <>
        //     {
        //         mock_microservices.map((microservice, index) => (
        //             <div key={index} className='w-full'>
        //                 <TableCard
        //                     isActive={microservice.status}
        //                     lable={microservice.name}
        //                     info={microservice.description}
        //                 />
        //             </div>
        //         ))
        //     }
        // </>
    )
}

export default MicroservicesHealthComponent