import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/api/auth/login", { email, password });

      // store token
      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      // redirect
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Login failed");
      console.log(err);
    }
  };

  return (
    <div>
       <div className="login-page">
      <div className="login-container">
      <h2>Login Page</h2>

      <input
        placeholder="Email"
          className="login-input"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        className="login-input"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

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
    </div>
  );
}
console.log("BASE URL:", import.meta.env.VITE_API_BASE_URL);