import "./Settings.css";
import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const SettingsForm = () => {
  const { currentPlayer, setCurrentPlayer } = useContext(PlayerContext);
  const [selectedColor, setSelectedColor] = useState("#ffffff");

  useEffect(() => {
    if (currentPlayer?.settings?.color) {
      const color = currentPlayer.settings.color;
      setSelectedColor(color);
      document.documentElement.style.setProperty("--secondary-color", color);
    }
  }, [currentPlayer]);

  const handleColorChange = async (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    document.documentElement.style.setProperty("--secondary-color", newColor);

    // Update user settings
    const updatedPlayer = {
      ...currentPlayer,
      settings: { ...currentPlayer.settings, color: newColor },
    };
    setCurrentPlayer(updatedPlayer);

    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${currentPlayer._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ color: newColor }),
        }
      );
      if (!response.ok) throw new Error("Failed to update color");
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };

  // Benutzername ändern
  const {
    register: registerUserName,
    handleSubmit: handleUserNameSubmit,
    formState: { errors: userNameErrors },
  } = useForm();
  const onUserNameSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/user/update-user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: currentPlayer.userName,
          newUserName: data.newUserName,
        }),
        credentials: "include",
      });
      if (response.ok) {
        alert("Benutzername erfolgreich aktualisiert");
      } else {
        alert("Fehler beim Aktualisieren des Benutzernamens");
      }
    } catch (error) {
      console.error("Fehler:", error);
      alert("Ein Fehler ist aufgetreten");
    }
  };

  // E-Mail ändern
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm();
  const onEmailSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/user/update-user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: currentPlayer.userName,
          newEmail: data.newEmail,
        }),
        credentials: "include",
      });
      if (response.ok) {
        alert("E-Mail erfolgreich aktualisiert");
      } else {
        alert("Fehler beim Aktualisieren der E-Mail");
      }
    } catch (error) {
      console.error("Fehler:", error);
      alert("Ein Fehler ist aufgetreten");
    }
  };

  // Passwort ändern
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm();
  const onPasswordSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/user/update-user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: currentPlayer.userName,
          newPassword: data.newPassword,
        }),
        credentials: "include",
      });
      if (response.ok) {
        alert("Passwort erfolgreich aktualisiert");
      } else {
        alert("Fehler beim Aktualisieren des Passworts");
      }
    } catch (error) {
      console.error("Fehler:", error);
      alert("Ein Fehler ist aufgetreten");
    }
  };

  return (
    <div className="content-box">
      <div className="settings-title">
        <h2>Benutzereinstellungen</h2>
      </div>

      <div className="user-settings">
        {/* Benutzername */}
        <div className="form-box">
          <form onSubmit={handleUserNameSubmit(onUserNameSubmit)}>
            <h3>Benutzername ändern</h3>
            <input
              type="text"
              placeholder="Neuer Benutzername"
              {...registerUserName("newUserName", {
                required: "Bitte gib einen neuen Usernamen ein.",
              })}
            />
            <button className="btn" type="submit">
              Benutzername aktualisieren
            </button>
          </form>
        </div>

        {/* E-Mail */}
        <div className="form-box">
          <form onSubmit={handleEmailSubmit(onEmailSubmit)}>
            <h3>E-Mail-Adresse ändern</h3>
            <input
              type="email"
              placeholder="Neue E-Mail-Adresse"
              {...registerEmail("newEmail", {
                required: "Bitte gib eine neue E-Mail-Adresse ein",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Ungültige E-Mail-Adresse",
                },
              })}
            />
            <button className="btn" type="submit">
              E-Mail-Adresse aktualisieren
            </button>
          </form>
        </div>

        {/* Passwort */}
        <div className="form-box">
          <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
            <h3>Passwort ändern</h3>
            <input
              type="password"
              placeholder="Neues Passwort"
              {...registerPassword("newPassword", {
                required: "Neues Passwort erforderlich",
                minLength: {
                  value: 8,
                  message: "Passwort muss mindestens 8 Zeichen lang sein",
                },
              })}
            />
            <button className="btn" type="submit">
              Passwort aktualisieren
            </button>
          </form>
        </div>

        {/* Farbe */}
        <div className="form-box color-settings">
          <h3>Farbeinstellungen</h3>
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            className="color-picker"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;
