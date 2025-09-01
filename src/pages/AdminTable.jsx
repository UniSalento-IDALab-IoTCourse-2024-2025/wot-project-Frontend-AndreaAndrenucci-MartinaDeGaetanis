import React, { useEffect, useState } from 'react';
import { TableNavbar, ConventionedDomainsComponent, DeviceHealthComponent, MicroservicesHealthComponent } from '../components/table';
// import { TableNavbar, TableCard } from '../components/tables';
import { useNavigate } from 'react-router-dom';
import { useAuthenticationProcessor } from '../hooks/backend/useAuthenticationProcessor';
import { hasPermission, PERMISSIONS } from '../constants/permissions';

const AdminTable = () => {
    const [isActive, setActive] = useState(0);

    const navigate = useNavigate();
    const {role, authed} = useAuthenticationProcessor();

    useEffect(() => {
        if (!authed || !hasPermission(role, PERMISSIONS.VIEW_ADMIN_PANEL)) {
            navigate('/');
        }
    }, [authed, role, navigate]);


    return (
        <div className='sansation h-screen w-full flex flex-col items-center pt-20'>
            { 
                <>
                    <TableNavbar setActiveIndex={setActive} isIndexActive={isActive} />
                    <div className='bg-[#e0e0e0] w-11/12 h-[85%] rounded-b-lg flex flex-col items-center overflow-auto no-scrollbar'>
                        {isActive==0 &&
                            <>
                                <DeviceHealthComponent/>
                            </>
                        }
                        {isActive==1 &&
                            <>
                                <MicroservicesHealthComponent/>
                            </>
                        }
                        {isActive==2 &&
                            <>
                                <ConventionedDomainsComponent/>
                            </>
                        }
                    </div>
                </>
            }
        </div>
    );
};


export default AdminTable;
