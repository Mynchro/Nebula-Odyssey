/* eslint-disable react/prop-types */
import { createContext, useState} from "react";


export const PlayerContext = createContext();
export const defaultUser_DEV = { userName: "Test", settings: { color: "#000000" } };

const PlayerProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState({
    user: defaultUser_DEV,
  });

  const fetchPlayerData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/${userId}`); 
      const data = await response.json();

      setPlayerData(data);

      setCurrentPlayer((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          settings: data.settings, // Nehme die Einstellungen aus der Datenbank
          planets: data.planets, // Füge die Planeten des Benutzers hinzu
        },
      }));

    } catch (error) {
      console.error("Fehler beim Abrufen der Spieldaten:", error);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include", 
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result); // Überprüfe das Ergebnis hier
  
        if (result.user && result.user._id) {
          await fetchPlayerData(result.user._id); // Hier die userId angeben
          setCurrentPlayer(result.user); // Setze den aktuellen Spieler
          console.log("Aktueller Spieler nach dem Login:", result.user); // Nutzerinformationen überprüfen
        } else {
          console.error("Benutzerinformationen fehlen im Ergebnis.");
        }
      } else {
        console.error("Login fehlgeschlagen");
      }
    } catch (error) {
      console.error("Fehler beim Login:", error);
    }
  };
  

  return (
    <PlayerContext.Provider
      value={{
        playerData,
        currentPlayer,
        setCurrentPlayer,
        handleLogin,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
