/* eslint-disable react/prop-types */

import { useState } from "react";
import "./Ressourcebar.css";

const Ressourcebar = ({ resources }) => {
  const [tooltip, setTooltip] = useState({
    text: "",
    visible: false,
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e, text) => {
    setTooltip({
      text,
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div className="ressourcebar">
      <div className="ressources">
        <div className="raw-material">
          <div
            className="raw raw1"
            onMouseMove={(e) => handleMouseMove(e, "Silizium")}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/ressource-icons/SILICA.png" alt="SILICA" />
            <p className="ressource-counter">{resources.silicon}</p>
          </div>
          <div
            className="raw raw2"
            onMouseMove={(e) => handleMouseMove(e, "Erze")}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/ressource-icons/ORE.png" alt="ORE" />
            <p className="ressource-counter">{resources.ores}</p>
          </div>
          <div
            className="raw raw3"
            onMouseMove={(e) => handleMouseMove(e, "Chemikalien")}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/ressource-icons/CHEM.png" alt="CHEM" />
            <p className="ressource-counter">{resources.chemicals}</p>
          </div>
        </div>
        <div className="products">
          <div
            className="prod prod3"
            onMouseMove={(e) => handleMouseMove(e, "Treibstoff")}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/ressource-icons/FUEL.png" alt="FUEL" />
            <p className="ressource-counter">{resources.fuel}</p>
          </div>
          <div
            className="prod prod1"
            onMouseMove={(e) => handleMouseMove(e, "Munition")}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/ressource-icons/AMMO.png" alt="AMMO" />
            <p className="ressource-counter">{resources.ammo}</p>
          </div>
          <div
            className="prod prod4"
            onMouseMove={(e) => handleMouseMove(e, "Stahl")}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/ressource-icons/STEEL.png" alt="STEEL" />
            <p className="ressource-counter">{resources.steel}</p>
          </div>
          <div
            className="prod prod2"
            onMouseMove={(e) => handleMouseMove(e, "Mikrochip")}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/ressource-icons/ELECTRONICS.png" alt="ELECTRONICS" />
            <p className="ressource-counter">{resources.electronics}</p>
          </div>
          <div
            className="prod prod5"
            onMouseMove={(e) => handleMouseMove(e, "Energie")}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/ressource-icons/ENERGY.png" alt="ENERGY" />
            <p className="ressource-counter">{resources.energy}</p>
          </div>
        </div>
      </div>
      {tooltip.visible && (
        <div
          className="tooltip"
          style={{
            left: tooltip.x + "px",
            top: tooltip.y + "px",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default Ressourcebar;
