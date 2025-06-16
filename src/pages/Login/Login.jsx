import React, { useState } from "react";
import "./login.css";
import { FaInfoCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { loginUser } from "../../services/apiService";

const Login = ({ onRequestClose, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(true);
  const [message, setMessage] = useState("");
  // const [token, setToken] = useState("");
  const showPasswordFunction = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      if (response.status === 401) {
        setMessage("Unauthorized: Invalid credentials");
        return;
      }

      if (!response.token) {
        setMessage("Failed to generate token");

        return;
      }

      // Save token to localStorage
      localStorage.setItem("token", response.token);
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      // Decode token and redirect based on role

      setMessage("User registered successfully");
      onRequestClose();
    } catch (error) {
      setMessage(error.message || "Login failed. Please try again.");
    } finally {
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <>
      <main>
        <div className="login-container">
          <button className="close-btn" onClick={onRequestClose}>
            ×
          </button>
          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="form-title">Login</h1>

            {message && (
              <p className="error-message">
                <FaInfoCircle style={{ marginRight: "5px" }} />
                {message}
              </p>
            )}

            <div className="form-row">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <label className="form-label">Password</label>
              <div className="form-input password-input">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "password" : "text"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <span className="eye-password" onClick={showPasswordFunction}>
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
            </div>
             <button className="form-button-login" type="submit">
              Login
            </button>
          </form>
          <p className="switch-link">
            Don't have an account?{" "}
            <button type="button" onClick={() => {
  console.log("CLICK: switch to register");
  onSwitchToRegister()}}>
              Register
            </button>
          </p>
        </div>
      </main>
    </>
  );
};

export default Login;
