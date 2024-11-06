/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const PlayerContext = createContext();
export const defaultUser_DEV = {
  userName: "Test",
  settings: { color: "#000000" },
};

const PlayerProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState({
    user: defaultUser_DEV,
  });

  const fetchPlayerData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("data:", data);
        setPlayerData(data);
        setCurrentPlayer({
          userName: data.userName,
          settings: data.settings,
          planets: data.planets,
          _id: data._id,
        });
      }
      // const data = await response.json();

      // setPlayerData(data);

      // setCurrentPlayer((prev) => ({
      //   ...prev,
      //   user: {
      //     ...prev.user,
      //     settings: data.settings, // Nehme die Einstellungen aus der Datenbank
      //     planets: data.planets, // Füge die Planeten des Benutzers hinzu
      //   },
      // }));
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
        console.log("result:", result); // Überprüfe das Ergebnis hier

        if (result.user && result.user._id) {
          // await fetchPlayerData(result.user._id);
          setCurrentPlayer(result.user); // Hier die userId angeben
          console.log("currentPlayer:", currentPlayer);
          console.log("Aktueller Spieler nach dem Login:", result.user); // Nutzerinformationen überprüfen
        } else {
          console.error("Benutzerinformationen fehlen im Ergebnis.");
        }
      } else {
        console.error("Login fehlgeschlagen:", response.statusText);
      }
    } catch (error) {
      console.error("Fehler beim Login:", error);
    }
  };

  const checkLoggedInUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/user/checkLoginStatus",
        {
          credentials: "include", // Ermöglicht das Senden von Cookies
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data && data._id) {
          await fetchPlayerData(data._id);
        } else {
          console.log("Kein eingeloggter Benutzer gefunden.");
        }
      } else {
        console.log("Keine Benutzerdaten gefunden:", response.statusText);
      }
    } catch (error) {
      console.error(
        "Fehler beim Überprüfen des eingeloggten Benutzers:",
        error
      );
    }
  };

  useEffect(() => {
    checkLoggedInUser();
  }, []);

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
