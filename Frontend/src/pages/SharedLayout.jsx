import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Ressourcebar from "../components/Ressourcen/Ressourcebar";
import Planets from "../components/Planets/Planets";
import Menubox from "../components/Menubox/Menubox";
import Chatbox from "../components/Chatbox/Chatbox";


const SharedLayout = () => {
    return (
        <>
        {/* nav/header */}
        <Navbar />
        <Ressourcebar />
        <Planets />
        <main className='main-container'>
            <Menubox />
            <Outlet />
            <Chatbox />
        </main>
        {/* footer */} 
        </>
    );
}

export default SharedLayout;
