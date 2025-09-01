import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScroll } from "../hooks"
import { navbar_default_style } from '../styles/styles';
import { home_navlink_default_style } from '../styles/icons-style';
import { home_navlinks } from '../constants/constants';
import { logo } from '../assets';


const HomeNavbar = () => {
    const isScrolled = useScroll();
    // const [activeLink, setActiveLink] = useActiveNavigation();
    const [activeLink, setActiveLink] = useState(-1);
    const navigate = useNavigate();

    const handleNavigation = (index, path) => {
        // if (path === "/logout") {
        //     sessionStorage.removeItem("jwt");
        //     navigate("/");
        //     window.location.reload()
        // } else if (path === "/user-page") {
        //     navigate(`/user-page/${tokenDatas.username}`)
        //     setActiveLink(index);
        // } else {
            setActiveLink(index);
            navigate(path);
        // }
    };

    return (
        <>
            {/* ${useAdaptiveStyle && 'bg-tertiary hover:text-secondary hover:shadow-object-card'}  */}
            {/* ${useAdaptiveStyle ? 'text-secondary' : 'text-softblack'} z-20` : 'z-10 font-extralight'} */}
            <div className={` unselectable
                ${navbar_default_style} 
                ${isScrolled ? 'text-secondary shadow-object-card' : 'bg-transparent text-secondary'}
            `}>
                <div className='font-bold text-2xl h-full flex items-end justify-center hover:cursor-pointer unselectable' onClick={() => handleNavigation(-1, "/home")}>
                    <img src={logo} alt='logo' className=' aspect-auto w-[90px] pb-1' onClick={()=>navigate("/home")}/>
                </div>

                <div className='flex flex-row items-center justify-center pb-1'>
                    {
                        home_navlinks.map((navlink, index) => (
                            <div
                                className={`h-full w-[100px] text-[20px] 
                                    ${home_navlink_default_style} 
                                    ${activeLink === index ? `font-bold ... z-20` : 'z-10 font-extralight'}`
                                }

                                key={index}
                                onClick={() => handleNavigation(index, navlink.link)}
                            >
                                {navlink.label}
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default HomeNavbar;
