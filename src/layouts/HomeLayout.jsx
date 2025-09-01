import { Outlet, useNavigate } from "react-router-dom"
import { HomeNavbar } from "../components"
import { useEffect } from "react"

const HomeLayout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/home")
    }, []);

    return(
        <>
            <HomeNavbar />
            <div className="fixed right-0 w-full h-full">
                <Outlet /> {/* Qui vengono renderizzate le rotte figlie */}
            </div>
        </>
    )
}
export default HomeLayout
