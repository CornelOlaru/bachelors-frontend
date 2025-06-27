import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Component for session expired feature -- NOT YET IMPLEMENTED
const SessionExpired = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("sessionId");
    localStorage.removeItem("guestToken");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Sesiunea a expirat</h2>
      <p>Scanează din nou codul QR pentru a începe o sesiune nouă.</p>
      <button onClick={() => navigate("/")}>Înapoi la scanare</button>
    </div>
  );
};

export default SessionExpired;
