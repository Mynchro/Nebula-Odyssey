import './Overview.css'
import { useContext } from "react";
import { PlayerContext } from '../../context/PlayerContext';

const Overview = () => {
    const { currentPlayer } = useContext(PlayerContext);

    return (
       <div className="content-box">
            <div className="uebersicht-title"><h1>Übersicht</h1></div>
            <div className="topcontent">
              <div className="uebersicht-topcontent">
                <h1 className='uebersicht-user'>Willkommen, <em>{currentPlayer.username}</em>!</h1>
              </div>
            </div>
            <div className="uebersicht-midcontent">
              <div className="midcontent midcontent-row1">
                <div className="uebersicht-status">
                  <h4>Raumkarte</h4>
                  <p><em>Aktive Planeten: 4</em></p>
                </div>
                <div className="uebersicht-status">
                  <h4>Forschung</h4>
                  <p><em>Aktuell keine Forschung in Betrieb</em></p>
                </div>
                <div className="uebersicht-status"><h4>Verteidigung</h4><p><em>Noch nicht erforscht</em></p></div>
              </div>
              <div className="midcontent midcontent-row2">
                <div className="uebersicht-status"><h4>Werften</h4><p><em>Keine Werften in Bau</em></p></div>
                <div className="uebersicht-status"><h4>Armada</h4><p><em>Keine Flotten in Bewegung</em></p></div>
                <div className="uebersicht-status"><h4>Gebaeude</h4><p><em>Keine Gebaeude in Bau</em></p></div>
              </div>
            </div>
        </div>
    );
}

export default Overview;
