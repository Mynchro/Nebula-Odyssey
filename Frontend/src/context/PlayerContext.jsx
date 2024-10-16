import { createContext, useState, useEffect } from "react";
import mockPlayerData from "../assets/data/mockData";

export const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState({
    username: "Guest",
    silica: 0,
    ore: 0,
    chem: 0,
    fuel: 0,
    ammo: 0,
    steel: 0,
    electronics: 0,
    energy: 0,
  });

  useEffect(() => {
    setPlayerData(mockPlayerData);
  }, []);

  const addPlayerData = (data) => {
    setPlayerData((prevData) => [...prevData, data]);
  };

  const addResourcesToCurrentPlayer = (resources) => {
    setCurrentPlayer((prevPlayer) => ({
      ...prevPlayer,
      ...Object.keys(resources).reduce((acc, key) => {
        acc[key] = (prevPlayer[key] || 0) + resources[key];
        return acc;
      }, {}),
    }));
  };

  return (
    <PlayerContext.Provider
      value={{
        playerData,
        addPlayerData,
        currentPlayer,
        setCurrentPlayer,
        addResourcesToCurrentPlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
