/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Planets.css';

const Planets = ({ planets, onPlanetSelect }) => {
  const [selectedPlanet, setSelectedPlanet] = useState(null); // State für den ausgewählten Planeten

  const handlePlanetClick = (index) => {
    setSelectedPlanet(index); // Speichere den ausgewählten Planeten
    onPlanetSelect(index); // Rufe die Funktion auf, um den Planeten auszuwählen
  };

  return (
    <div className="planete-bar">
      <div className="planetes">
        {/* Map über das Planeten-Array */}
        {planets.map((planet, index) => (
          <div
            className={`planet ${selectedPlanet === index || (selectedPlanet === null && index === 0) ? 'selected' : 'noselect'}`} // Dynamische Klasse
            key={planet._id}
            onClick={() => handlePlanetClick(index)} // Klick-Event für Planeten-Auswahl
            style={{ cursor: 'pointer' }} // Zeiger für bessere UX
          >
            <img src={`/planets/p-${index + 1}.png`} alt={planet.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planets;
