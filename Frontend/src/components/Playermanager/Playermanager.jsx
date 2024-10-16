import { useContext, useEffect } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const Playermanager = () => {
  const { addResourcesToCurrentPlayer } = useContext(PlayerContext);

  useEffect(() => {
    const interval = setInterval(() => {
      const additionalResources = {
        silica: 15,
        ore: 18,
        chem: 7,
        fuel: 5,
        ammo: 11,
        steel: 35,
        electronics: 17,
        energy: 10,
      };

      addResourcesToCurrentPlayer(additionalResources);
    }, 1000);

    return () => clearInterval(interval);
  }, [addResourcesToCurrentPlayer]);

  return <div></div>;
};

export default Playermanager;
