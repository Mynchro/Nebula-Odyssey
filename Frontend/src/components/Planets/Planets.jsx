import "./Planets.css"

const Planets = () => {
    return (
        <div className="planete-bar">
          <div className="planetes">
            <div className="planet planet1">
              <img src="/planets/p-1.png" alt="" />
            </div>
            <div className="planet planet2">
              <img src="/planets/p-2.png" alt="" />
            </div>
            <div className="planet planet3">
              <img src="/planets/p-3.png" alt="" />
            </div>
            <div className="planet planet4">
              <img src="/planets/p-4.png" alt="" />
            </div>
            <div className="planet planet5">
              <img src="/planets/p-5.png" alt="" />
            </div>
          </div>
        </div>
    );
}

export default Planets;
