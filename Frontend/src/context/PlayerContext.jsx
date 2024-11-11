/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
        setCurrentPlayer(result.user);

        // if (result.user && result.user._id) {
        //   // await fetchPlayerData(result.user._id);
        //   setCurrentPlayer(result.user); // Hier die userId angeben
        console.log("currentPlayer:", currentPlayer);
        console.log("Aktueller Spieler nach dem Login:", result.user); // Nutzerinformationen überprüfen
        // } else {
        //   console.error("Benutzerinformationen fehlen im Ergebnis.");
        // }
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
        setCurrentPlayer(data);
      } else {
        navigate("/");
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
