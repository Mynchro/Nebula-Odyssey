import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../../context/PlayerContext';
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // State für Confirm Password
    const [eMail, setEmail] = useState(""); // State für E-Mail
    const [isRegistered, setIsRegistered] = useState(false); // State für Modus (Login/Register)
    const navigate = useNavigate();
    const { playerData, setCurrentPlayer } = useContext(PlayerContext);

  const handleLogin = (e) => {
    e.preventDefault(); // Verhindert das Standard-Formular-Submit-Verhalten
    
    if (!isRegistered) {
        playerData.map((currentUser) => {
            if (currentUser.username === username && currentUser.password === password){
                setCurrentPlayer({...currentUser});
                navigate("/overview");
            }
        });
      }

      // Registrierungs-Logik
    if (isRegistered) {
        if (password !== confirmPassword) {
          alert("Passwörter stimmen nicht überein!");
          return;
        }
        // Registriere neuen Benutzer (hier könntest du deine eigene Logik einbauen)
        const newUser = { username, password, eMail };
        console.log("Neuer Benutzer registriert:", newUser);
        // Füge Registrierungscode hier hinzu...
        setIsRegistered(false); // Wechsel zurück zum Login-Modus nach Registrierung
      }
    };
  
    // Wechsel zwischen Login und Register
    const toggleMode = () => {
      setIsRegistered(!isRegistered);
      // Felder zurücksetzen, wenn der Modus gewechselt wird
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setEmail("");
    };

    return (
        <div className="login-content">
            <img 
                className="login-logo" 
                src="/icons/logo_placeholder.png" 
                alt="Logo Nebula Odyssey" 
            />
            <h1 className="login-title">Nebula Odyssey</h1>
            <div className="login-box">
                <h2>{isRegistered ? "Register" : "Login"}</h2>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleLogin(e);
                        }
                      }}
                />
                {isRegistered && (
          <>
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="E-mail" 
              value={eMail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}

        <button onClick={handleLogin}>
          {isRegistered ? "Register" : "Login"}
        </button>

        {/* Link zum Umschalten zwischen Login und Register */}
        <p>
          {isRegistered ? "Already have an account? " : "Don't have an account? "}
          <a className="loginATag" href="#" onClick={toggleMode}>
            {isRegistered ? "Login here" : "Register here"}
          </a>
        </p>
      </div>
            <img
                className="schlachtkreuzer-img" 
                src="/werften/große_werft/schlachtkreuzer/schlachtkreuzer_1-removebg-preview.png" 
                alt="schlachtkreuzer" 
            />
            <img
                className="schlachtschiff-img" 
                src="/werften/große_werft/schlachtschiff/schlachtschiff_1-removebg-preview.png" 
                alt="schlachtschiff" 
            />
        </div>
    );
};

export default Login;


