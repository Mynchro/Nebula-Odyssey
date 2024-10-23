import { useState, useEffect } from "react";
import "./Spacemap.css";
import { PlanetBox } from "../../components/Spacemap/Planetbox";

const Spacemap = () => {
  const [choicePlanet, setChoicePlanet] = useState(null); // Umbenannt
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const planetsPerPage = 9;

  // API-Aufruf in useEffect
  useEffect(() => {
    fetch('http://localhost:3000/api/planets')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht ok');
        }
        return response.json(); // Versuche, die Antwort als JSON zu parsen
      })
      .then((data) => {
        setPlanets(data); // Speichere die Planetendaten im State
      })
      .catch((error) => {
        console.error('Fehler beim Laden der Planeten:', error);
      });
  }, []);

  const indexOfLastPlanet = currentPage * planetsPerPage;
  const indexOfFirstPlanet = indexOfLastPlanet - planetsPerPage;
  const currentPlanets = planets.slice(indexOfFirstPlanet, indexOfLastPlanet);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="content-box" onClick={() => setChoicePlanet(null)}>
      <div className="solarsystem">
        <i className="fa-solid fa-spaghetti-monster-flying" style={{ color: '#ffffff' }}></i>
        <p>Sonnensystem</p>
        {/* Navigation zwischen den Seiten */}
        <button 
          className="arrow-button" 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          <span className="arrow-left"></span>
        </button>
        <div className="coordinate">{String(currentPage).padStart(2, '0')}</div>
        <button 
          className="arrow-button" 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage * planetsPerPage >= planets.length}
        >
          <span className="arrow-right"></span>
        </button>
      </div>
      <div className="galaxy">
      <div className="planet-overview">
          {choicePlanet ? (
            <>
              <img id="planet-overview-img" src={choicePlanet.image} alt={choicePlanet.name} />
              <div>
                <p>{choicePlanet.name}</p>
                <p>{choicePlanet.owner ? choicePlanet.owner : "Unknown Owner"}</p>
                <p>{`Buildings: ${choicePlanet.buildings.length}`}</p>
              </div>
            </>
          ) : (
            <p>Klicke auf einen Planeten, um Details zu sehen</p>
          )}
        </div>
        {currentPlanets.map((planet, index) => (
          <PlanetBox
            key={index}
            number={index + 1 + indexOfFirstPlanet}
            image={planet.image} 
            alt="planet"
            info={`Buildings: ${planet.buildings.length}`}
            circleColor={"#ff0000"}
            triangleColor={"#00ff00"}
            skullColor={"#0000ff"} 
            planetName={planet.name} 
            playerName={planet.owner ? planet.owner : "Unknown Owner"} 
            // Dynamisch eine Klasse hinzufügen, wenn der Planet ausgewählt ist
            className={`planet-box ${choicePlanet && choicePlanet.name === planet.name ? 'choice' : ''}`} // Dynamische Klasse 'choice'
            onClick={() => setChoicePlanet(planet)}
          />
        ))}
      </div>
    </div>
  );
};

export default Spacemap;


