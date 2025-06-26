import React, { useState } from "react";
import { registerUser } from "../../services/apiService";
import { FaInfoCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./signupModal.css";
import Modal from "../../components/modal/Modal";

const SignupModal = ({ onRequestClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showRetypedPassword, setShowRetypedPassword] = useState(true);
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await registerUser(formData);
      if (!response.ok) {
        setMessage(formData.message || "Error at Register");
        return;
      }

      setMessage("User registered successfully");
      onRequestClose();
      onSwitchToLogin();
    } catch (error) {
      console.error({ message: "Error registering user", error });
    } finally {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
      });
      setConfirmPassword("")
    }
  };

  return (
    <>
      
        <Modal.Title>

          Înregistrare
        </Modal.Title>
        <Modal.Body>

        
        <form className="signup-form" onSubmit={handleRegister}>

          {message && (
            <p className="error-message">
              <FaInfoCircle style={{ marginRight: "5px" }} />
              {message}
            </p>
          )}

          <div className="form-row">
            <label className="form-label">Prenume</label>
            <input
              className="form-input"
              name="firstName"
              type="text"
              placeholder="Introduceți prenumele"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label">Nume</label>
            <input
              className="form-input"
              name="lastName"
              type="text"
              placeholder="Introduceți numele"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

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
            <label className="form-label">Password</label>
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
              <span className="eye-password-register" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>

          <div className="form-row">
            <label className="form-label">Confirm Password</label>
            <div className="form-input password-input">
              <input
              className="form-input"
                name="confirmPassword"
                type={showRetypedPassword ? "password" : "text"}
                placeholder="Confirmați parola"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="eye-password-register" onClick={() => setShowRetypedPassword(!showRetypedPassword)}>
                {showRetypedPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>

          <div className="form-row">
            <label className="form-label">Număr de telefon</label>
            <input
              className="form-input"
              name="phoneNumber"
              type="text"
              placeholder="Introduceți numărul de telefon"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <button className="form-button-register" type="submit">
            Înregistrare
          </button>
        </form>
<Modal.Footer>

        <p className="switch-link">
          Aveți deja un cont?
          <button type="button" onClick={onSwitchToLogin}>
            Autentificare
          </button>
        </p>
</Modal.Footer>
</Modal.Body>
   
    </>
  );
};

export default SignupModal;
