import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../../context/PlayerContext";
import "./Login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { handleLogin } = useContext(PlayerContext);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (loggedIn) {
      document.body.classList.add("logged-in");
    } else {
      document.body.classList.remove("logged-in");
    }
    setIsLoggedIn(loggedIn);
  }, []);

  const onSubmit = async (data) => {
    if (isRegistered) {
      await handleRegister(data);
    } else {
      const success = await handleLogin(data);
      if (success) {
        localStorage.setItem("isLoggedIn", "true");
        document.body.classList.add("logged-in");
        navigate("/overview");
      } else {
        setErrorMessage("Ungültige Login-Daten! Bitte erneut versuchen.");
      }
    }
  };

    // Effekt für Hintergrundwechsel
    useEffect(() => {
      if (isLoggedIn) {
        document.body.classList.add("logged-in");
      } else {
        document.body.classList.remove("logged-in");
      }
    }, [isLoggedIn]);

  const handleRegister = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.status === 201) {
        alert("Erfolgreich registriert!");
        setIsRegistered(false);
      } else {
        alert(`Registrierung fehlgeschlagen: ${result.message}`);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert(
        "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
      );
    }
  };

  const toggleAuthMode = () => {
    setIsRegistered(!isRegistered);
    setErrorMessage("");
  };

  const toggleVideoVisibility = () => {
    setIsVideoVisible(!isVideoVisible);
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("userName", { required: "Username is required!" })}
            type="text"
            placeholder="Username"
          />
          {errors.userName && (
            <span className="error-message">{errors.userName.message}</span>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required!" })}
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}

          {isRegistered && (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="error-message">
                  {errors.confirmPassword.message}
                </span>
              )}

              <input
                type="email"
                placeholder="E-mail"
                {...register("email", {
                  required: "E-Mail is required!",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format!",
                  },
                })}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </>
          )}

          <button type="submit">{isRegistered ? "Register" : "Login"}</button>
        </form>

        <p>
          {isRegistered
            ? "Already have an account? "
            : "Don't have an account? "}
          <a className="loginATag" href="#" onClick={toggleAuthMode}>
            {isRegistered ? "Login here" : "Register here"}
          </a>
        </p>
      </div>

      {/* Video Toggle */}
      <div className="video-toggle-container">
        <button className="toggle-button" onClick={toggleVideoVisibility}>
          ▼ Intro Video anschauen ▼
        </button>
      </div>

      {/* Video Content */}
      <div className={`video-content ${isVideoVisible ? "open" : ""}`}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/77jkkRwZT6Q"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Login;
