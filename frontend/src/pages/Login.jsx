import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

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