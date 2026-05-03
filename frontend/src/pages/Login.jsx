import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const BASE = "https://ethara-ai-production-cac0.up.railway.app";

  const handleLogin = async () => {
    console.log("Login clicked");

    try {
      const res = await axios.post(
        `${BASE}/api/auth/login`,
        { email, password }
      );

      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      window.location.href = "/dashboard";
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      alert("Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login Page</h2>

        <input
          placeholder="Email"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="login-btn">
          Login
        </button>

        <div className="login-footer">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Signup
          </span>
        </div>
      </div>
    </div>
  );
}