import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PlayerContext = createContext();
export const defaultUser_DEV = {
  userName: "Test",
  settings: { color: "#cccccc" }, // Subtile, weniger auffällige Fallback-Farbe (z. B. Grau)
};

const PlayerProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState({
    user: defaultUser_DEV,
  });
  const [choicePlanet, setChoicePlanet] = useState(null);
  const navigate = useNavigate();

  const setSecondaryColor = (color) => {
    document.documentElement.style.setProperty(
      "--secondary-color",
      color || "#cccccc"
    );
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
        setCurrentPlayer(result.user);

        // Setze die Farbe basierend auf den Nutzereinstellungen nach Login
        const color = result.user?.settings?.color || "#cccccc"; // Verwendet Grau als Fallback
        setSecondaryColor(color);

        console.log("Aktueller Spieler nach dem Login:", result.user);
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
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCurrentPlayer(data);

        // Setze die Farbe basierend auf den gespeicherten Einstellungen des Benutzers
        const color = data?.settings?.color || "#cccccc"; // Verwendet Grau als Fallback
        setSecondaryColor(color);
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
        choicePlanet,
        setChoicePlanet,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
