import { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import "./Spacemap.css";
import { PlanetBox } from "../../components/Spacemap/Planetbox";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const Spacemap = () => {
  const { currentPlayer, choicePlanet, setChoicePlanet } =
    useContext(PlayerContext);
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const planetsPerPage = 9;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentPlayer?.page) {
      setCurrentPage(currentPlayer.page);
    }
  }, [currentPlayer]);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/planets")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Netzwerkantwort war nicht ok");
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((planet, index) => {
          // console.log(
          //   `Planet ${index}: Page - ${planet.position?.page}, PositionOnPage - ${planet.position?.positionOnPage}`
          // );
        });

        const sortedData = data.sort((a, b) => {
          const pageA = a.position?.page ?? 0;
          const pageB = b.position?.page ?? 0;
          const positionOnPageA = a.position?.positionOnPage ?? 0;
          const positionOnPageB = b.position?.positionOnPage ?? 0;

          if (pageA === pageB) {
            return positionOnPageA - positionOnPageB;
          }
          return pageA - pageB;
        });

        setPlanets(sortedData);
      })
      .catch((error) => {
        console.error("Fehler beim Laden der Planeten:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const indexOfLastPlanet = currentPage * planetsPerPage;
  const indexOfFirstPlanet = indexOfLastPlanet - planetsPerPage;
  const currentPlanets = planets.slice(indexOfFirstPlanet, indexOfLastPlanet);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(
      Math.max(
        1,
        Math.min(pageNumber, Math.ceil(planets.length / planetsPerPage))
      )
    );
  };

  return (
    <div className="content-box">
      <div className="solarsystem">
        <i
          className="fa-solid fa-spaghetti-monster-flying"
          style={{ color: "#ffffff" }}
        ></i>
        <p>Sonnensystem</p>
        <button
          className="arrow-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="arrow-left"></span>
        </button>
        <div className="coordinate">{String(currentPage).padStart(2, "0")}</div>
        <button
          className="arrow-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * planetsPerPage >= planets.length}
        >
          <span className="arrow-right"></span>
        </button>
      </div>
      {loading ? (
        <LoadingScreen message="Scanne Sonnensystem..." />
      ) : currentPlanets.length ? (
        <div className="galaxy">
          <div className="planet-overview">
            {choicePlanet ? (
              <>
                <img
                  id="planet-overview-img"
                  src={choicePlanet.image}
                  alt={choicePlanet.name}
                />
                <div className="planet-menu">
                  <p>{`Planetname: ${choicePlanet.name}`}</p>
                  <p>{`Besitzer: ${
                    choicePlanet.owner
                      ? choicePlanet.owner.userName
                      : "Unbekannter Spieler"
                  }`}</p>
                  {choicePlanet.name === "Nebula" ? (
                    <p>Heimatplaneten können nicht besiedelt werden!</p>
                  ) : (
                    <button
                      onClick={() => {
                        navigate("/armada");
                      }}
                      className="btn set-armada"
                    >
                      Armada zusammenstellen
                    </button>
                  )}
                </div>
              </>
            ) : (
              <p>Klicke auf einen Planeten, um Details zu sehen</p>
            )}
          </div>
          {currentPlanets.map((planet) => (
            <PlanetBox
              key={planet._id}
              number={planet.position.positionOnPage + 1}
              image={planet.image}
              alt="planet"
              info={`Buildings: ${planet.buildings.length}`}
              circleColor={"#ff0000"}
              triangleColor={"#00ff00"}
              skullColor={"#0000ff"}
              planetName={planet.name}
              playerName={
                planet.owner ? planet.owner.userName : "Unbekannter Spieler"
              }
              className={`planet-box ${
                choicePlanet && choicePlanet._id === planet._id ? "choice" : ""
              }`}
              onClick={() => setChoicePlanet(planet)}
            />
          ))}
        </div>
      ) : (
        <p>Keine Planeten gefunden.</p>
      )}
    </div>
  );
};

export default Spacemap;
