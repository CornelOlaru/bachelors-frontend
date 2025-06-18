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

          <h1 className="form-title">Register</h1>
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
            <label className="form-label">First Name</label>
            <input
              className="form-input"
              name="firstName"
              type="text"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label">Last Name</label>
            <input
              className="form-input"
              name="lastName"
              type="text"
              placeholder="Enter last name"
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
              className="form-input"
                name="password"
                type={showPassword ? "password" : "text"}
                placeholder="Password"
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
                placeholder="Confirm Password"
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
            <label className="form-label">Phone Number</label>
            <input
              className="form-input"
              name="phoneNumber"
              type="text"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <button className="form-button-register" type="submit">
            Sign up
          </button>
        </form>
</Modal.Body>
<Modal.Footer>

        <p className="switch-link">
          Already have an account?{" "}
          <button type="button" onClick={onSwitchToLogin}>
            Login
          </button>
        </p>
</Modal.Footer>
   
    </>
  );
};

export default SignupModal;
