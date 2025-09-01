import { Outlet, useNavigate } from "react-router-dom"
import { AppNavbar } from "../components"
import { useEffect } from "react";

const AppLayout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate("map")
    }, []);

    return (
        <>
            <AppNavbar />
            <div className="w-[92%] overflow-x-clip fixed right-0">
                <Outlet /> {/* Qui vengono renderizzate le rotte figlie */}
            </div>
        </>
    )
}

export default AppLayout
