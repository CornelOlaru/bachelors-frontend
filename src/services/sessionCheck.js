import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useSessionCheck = () => {
  const navigate = useNavigate();
  const { tableId } = useParams();
  const apiUrl = import.meta.env.VITE_DEV_API_BASE_URL;

  useEffect(() => {
    if (!tableId) return;

    const checkSession = async () => {
      const sessionId = localStorage.getItem("sessionId");
      if (!sessionId) return; // Prima accesare (scanare), va genera unul nou automat în TablePage

      try {
        const res = await fetch(`${apiUrl}/api/orders/search?table=${tableId}&sessionId=${sessionId}`);
        const data = await res.json();
        const orders = data.orders || [];

        // Verifici dacă există o comandă activă (ex: inProgress, pending)
        const activeOrder = orders.some(
          o => o.status === "inProgress" || o.status === "pending"
        );
        if (activeOrder) {
          // Comandă activă, nu faci nimic, userul poate sta pe meniu oricât!
          return;
        }

        // Dacă nu există niciuna, verifici dacă a trecut timeout-ul de 30 min de la ultima activitate
        if (orders.length) {
          const lastOrder = orders[orders.length - 1];
          const updatedAt = new Date(lastOrder.updatedAt);
          const now = new Date();
          const diff = (now - updatedAt) / (1000 * 60); // în minute
          const timeoutLimit = 30; // 30 minute

          if (diff < timeoutLimit) {
            // Nu au trecut încă 30 min, lasă userul pe meniu
            return;
          }
        }

        // Dacă nu există nicio comandă sau a trecut timeoutul, ștergi sesiunea și redirect!
        localStorage.removeItem("sessionId");
        localStorage.removeItem("cart");
        navigate(`/sessionExpired?table=${tableId}`);

      } catch (err) {
        console.error("❌ Eroare la verificarea sesiunii:", err);
      }
    };

    checkSession();
  }, [tableId]);
};
