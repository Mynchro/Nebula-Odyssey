import "./Menubox.css"
import { NavLink } from "react-router-dom";

const Menubox = () => {
    return (
        <div className="main-content">
          <div className="logo">
            <NavLink to='/overview' className={({ isActive }) => isActive ? 'active' : ''}>
                <img src="/icons/logo_placeholder.png" alt="logo" />
            </NavLink>
          </div>
          <div className="menu-box">
            <NavLink to='/overview' className={({ isActive }) => isActive ? 'active' : ''}>
                <button className="btn uebersicht">Übersicht</button>
            </NavLink>
            <NavLink to='/spacemap' className={({ isActive }) => isActive ? 'active' : ''}>
                <button className="btn raumkarte">Raumkarte</button>
            </NavLink>
            <NavLink to='/buildings' className={({ isActive }) => isActive ? 'active' : ''}>
                <button className="btn ziviler">Gebaeude</button>
            </NavLink>
            <NavLink to='/research' className={({ isActive }) => isActive ? 'active' : ''}>
                <button className="btn forschung">Forschung</button>
            </NavLink>
            <NavLink to='/shipyard' className={({ isActive }) => isActive ? 'active' : ''}>
                <button className="btn werften">Werften</button>
            </NavLink>
            <NavLink to='/defense'className={({ isActive }) => isActive ? 'active' : ''}>
                <button className="btn verteidigung">Verteidigung</button>
            </NavLink>
            <NavLink to='/armada' className={({ isActive }) => isActive ? 'active' : ''}>
                <button className="btn armada">Armada</button>
            </NavLink>
          </div>
        </div>
    );
};

export default Menubox;
