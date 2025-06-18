import { useEffect, useState } from "react";
import "./profileModal.css";
import { jwtDecode } from "jwt-decode";
import { getUser, saveUser } from "../../services/apiService";
import { FaInfoCircle } from "react-icons/fa";
import Modal from "../../components/modal/Modal";
const ProfileModal = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [editMode, setEditMode] = useState(false);
  const token = localStorage.getItem("token");

  const decoded = token && jwtDecode(token);
  const userId = decoded.id;
  const [paidOrders, setPaidOrders] = useState([]);

  const [message, setMessage] = useState("");
  const apiUrl = import.meta.env.VITE_DEV_API_BASE_URL;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(userId);
        setFormData(response);
      } catch (error) {
        console.error({ message: "Failed fetching user", error });
      }
    };
    fetchUser();
  }, [userId]);

  const handleSave = async () => {
    try {
      const response = await saveUser(userId, formData);

      if (!response.ok) {
        const errorMessage =
          response?.message || "Eroare la actualizarea datelor.";
        setMessage(errorMessage);
        return;
      }

      alert("Datele au fost actualizate cu succes.");
    } catch (error) {
      console.error("Eroare salvare:", error);
    } finally {
      setMessage("");
      setEditMode(false);
    }
  };

  useEffect(() => {
    const fetchUserOrder = async () => {
      if (!userId || activeTab !== "orders") return;
      try {
        const response = await fetch(
          `${apiUrl}/api/orders/search/paid?userId=${userId}`
        );
        const data = await response.json();
        console.log("this is the ordered object", data);
        setPaidOrders(data.orders || []);
        console.log("this is the ordered items", paidOrders);
      } catch (error) {
        console.error({ message: "Failed to fetch orders", error });
        setPaidOrders([]);
      }
    };
    fetchUserOrder();
  }, [userId, activeTab]);

  return (
    <div className="profile-container">
      <div className="profile-modal">
        <Modal.Title>
          <div className="profile-header">

          <h2>My Profile</h2>
          <h3 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
            Hi, {decoded.firstName}
          </h3>
          </div>
        </Modal.Title>
        <Modal.Body>
          <div className="tabs">

          <button
            className={activeTab === "personal" ? "active" : ""}
            onClick={() => setActiveTab("personal")}
            >
            Date personale
          </button>
          <button
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
            >
            Istoric Comenzi
          </button>

            </div>
          <div className="tabs">
            <div className="user-tab">
              {activeTab === "personal" && (
                <>
                  {message && (
                    <p className="error-message">
                      <FaInfoCircle style={{ marginRight: "5px" }} />
                      {message}
                    </p>
                  )}

                  <div className="personal-data-edit">
                    <input
                      name="firstName"
                      value={formData.firstName || ""}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                    <input
                      name="lastName"
                      value={formData.lastName || ""}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                    <input
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                    <input
                      name="phoneNumber"
                      value={formData.phoneNumber || ""}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />

                    {!editMode ? (
                      <button
                        className="edit-btn"
                        onClick={() => setEditMode(true)}
                      >
                        Modify
                      </button>
                    ) : (
                      <>
                        <button className="save-btn" onClick={handleSave}>
                          Save
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="order-tab">
              {activeTab === "orders" && (
                <div className="order-history">
                  <ul>
                    {paidOrders.length > 0 ? (
                      paidOrders.map((order) => (
                        <li key={order._id}>
                          Comandă #{order._id.slice(-5)} - {order.totalPrice}{" "}
                          lei
                        </li>
                      ))
                    ) : (
                      <p>Nu ai comenzi salvate.</p>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </Modal.Footer>
      </div>
    </div>
  );
};

export default ProfileModal;
