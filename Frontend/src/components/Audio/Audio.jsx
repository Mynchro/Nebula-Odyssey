import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import "./audio.css";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.15); // Lautstärke von 0 bis 1
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    // Audio starten, wenn die Komponente geladen wird
    if (audio) {
      audio.play();
    }

    return () => {
      // Clean-up: Audio stoppen und zurücksetzen, wenn die Komponente unmountet wird
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    // Lautstärke anpassen
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  return (
    <div>
      <audio ref={audioRef} src="/whisper_through_the_stars.mp3" loop />
      <div className="audio-controls">
        <button onClick={toggleMute} className="mute-btn">
          <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          disabled={isMuted}
          className="volume-slider"
        />
        <label>{Math.round(volume * 100)}%</label>
      </div>
    </div>
  );
};

export default AudioPlayer;
