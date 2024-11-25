import { createContext, useEffect, useState, useRef } from "react";
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
  const [countdown, setCountdown] = useState(null);
  const [constructionEndTime, setConstructionEndTime] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef(null);

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
        return true;
      } else {
        console.error("Login fehlgeschlagen:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Fehler beim Login:", error);
      return false;
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

  const startCountdown = (endTime) => {
    if (timerRunning) return; // Verhindere doppeltes Starten des Timers

    timerRef.current = setInterval(() => {
      const timeRemaining = new Date(endTime) - new Date();
      if (timeRemaining <= 0) {
        clearInterval(timerRef.current); // Stoppe den Timer
        setTimerRunning(false);
        setCountdown(0); // Countdown zurücksetzen
        localStorage.removeItem("countdown");
        localStorage.removeItem("constructionEndTime");
      } else {
        setCountdown(Math.floor(timeRemaining / 1000)); // Setze den Countdown
      }
    }, 1000);

    setTimerRunning(true); // Timer läuft jetzt
  };

  useEffect(() => {
    const savedEndTimeString = localStorage.getItem("constructionEndTime");
    if (savedEndTimeString) {
      const endTime = new Date(savedEndTimeString).getTime();
      if (!isNaN(endTime)) {
        setConstructionEndTime(endTime);
      } else {
        console.error("Fehler beim Parsen der Endzeit:", savedEndTimeString);
      }
    }
  }, []);

  // Bereinigung
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current); // Stoppe den Timer beim Unmount
      }
    };
  }, []);

  useEffect(() => {
    if (constructionEndTime && countdown === null) {
      startCountdown(constructionEndTime);
    }
  }, [constructionEndTime, timerRunning]);

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        playerData,
        currentPlayer,
        countdown,
        setCountdown,
        startCountdown,
        constructionEndTime,
        setConstructionEndTime,
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
