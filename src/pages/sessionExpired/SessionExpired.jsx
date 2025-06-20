import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SessionExpired = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("sessionId");
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
