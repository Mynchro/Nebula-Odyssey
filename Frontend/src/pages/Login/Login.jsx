import { useState, useContext } from "react";
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
  const [isRegistered, setIsRegistered] = useState(false); // State für Modus (Login/Register)
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (isRegistered) {
      handleRegister(data);
    } else {
      handleLogin(data);
      navigate("/overview");
    }
  };

  /*const handleLogin = async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("result:", result);
      if (response.status === 200) {
        setCurrentPlayer(result);
        navigate("/overview");
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };*/
  const handleRegister = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.status === 201) {
        console.log("Registered successfully:", result.message);
        setIsRegistered(false); // Nach erfolgreicher Registrierung zum Login-Modus wechseln
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  // Umschalten zwischen Login und Registrierung
  const toggleMode = () => {
    setIsRegistered(!isRegistered);
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
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <input
            {...register("userName", { required: "Username is required!" })}
            type="text"
            placeholder="Username"
          />
          {errors.userName && (
            <span className="error-message">{errors.userName.message}</span>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required!" })}
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}

          {/* Confirm Password - Nur anzeigen, wenn Registrierung */}
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

              {/* E-Mail */}
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

        {/* Link zum Umschalten zwischen Login und Register */}
        <p>
          {isRegistered
            ? "Already have an account? "
            : "Don't have an account? "}
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
