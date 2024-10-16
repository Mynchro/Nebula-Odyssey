import "./Ressourcebar.css";
import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const Ressourcebar = () => {
  const { currentPlayer } = useContext(PlayerContext);

  return (
    <div className="ressourcebar">
      <div className="ressources">
        <div className="raw-material">
          <div className="raw raw1">
            <img src="/ressource-icons/SILICA.png" alt="SILICA" />
            <p className="ressource-counter">{currentPlayer.silica}</p>
          </div>
          <div className="raw raw2">
            <img src="/ressource-icons/ORE.png" alt="ORE" />
            <p className="ressource-counter">{currentPlayer.ore}</p>
          </div>
          <div className="raw raw3">
            <img src="/ressource-icons/CHEM.png" alt="CHEM" />
            <p className="ressource-counter">{currentPlayer.chem}</p>
          </div>
        </div>
        <div className="products">
          <div className="prod prod3">
            <img src="/ressource-icons/FUEL.png" alt="FUEL" />
            <p className="ressource-counter">{currentPlayer.fuel}</p>
          </div>
          <div className="prod prod1">
            <img src="/ressource-icons/AMMO.png" alt="AMMO" />
            <p className="ressource-counter">{currentPlayer.ammo}</p>
          </div>
          <div className="prod prod4">
            <img src="/ressource-icons/STEEL.png" alt="STEEL" />
            <p className="ressource-counter">{currentPlayer.steel}</p>
          </div>
          <div className="prod prod2">
            <img src="/ressource-icons/ELECTRONICS.png" alt="ELECTRONICS" />
            <p className="ressource-counter">{currentPlayer.electronics}</p>
          </div>
          <div className="prod prod5">
            <img src="/ressource-icons/ENERGY.png" alt="ENERGY" />
            <p className="ressource-counter">{currentPlayer.energy}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ressourcebar;
