import React, { useState } from "react";
import "./login.css";
import { FaInfoCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { loginUser } from "../../services/apiService";
import Modal from "../../components/modal/Modal";

const Login = ({ onRequestClose, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(true);
  const [message, setMessage] = useState("");

  const togglePassword = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);

      if (response.status === 401) return setMessage("Eroare: Email sau parolă incorecte!");

      if (!response.token) return setMessage("Failed to generate token");

      localStorage.setItem("token", response.token);
      localStorage.removeItem("guestToken");
      setMessage("Login successful");
      onRequestClose();
    } catch (error) {
      setMessage(error.message || "Login failed.");
    } finally {
      setFormData({ email: "", password: "" });
    }
  };

  return (
    <>
      <Modal.Title>Autentificare</Modal.Title>

      <Modal.Body>
        <form className="login-form" onSubmit={handleSubmit}>
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
              name="email"
              type="email"
              placeholder="Introduceți adresa de email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label">Parolă</label>
            <div className="form-input password-input">
              <input
              className="form-input"
                name="password"
                type={showPassword ? "password" : "text"}
                placeholder="Introduceți parola"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <span className="eye-password" onClick={togglePassword}>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>

          <button className="form-button-login" type="submit">
            Autentificare
          </button>
        </form>
      <Modal.Footer>
        <p className="switch-link">Nu ai cont?{" "}
        <button type="button" onClick={onSwitchToRegister}>
          Înregistrează-te
        </button></p>
      </Modal.Footer>
      </Modal.Body>

    </>
  );
};

export default Login;
