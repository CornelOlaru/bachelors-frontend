import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//Component for checking the session expired component -- NOT YET IMPLEMENTED
export const useSessionCheck = () => {
  const navigate = useNavigate();
  const { tableId } = useParams();
  const apiUrl = import.meta.env.VITE_DEV_API_BASE_URL;

  useEffect(() => {
    if (!tableId) return;

    const checkSession = async () => {
      const sessionId = localStorage.getItem("sessionId");
      if (!sessionId) return; // The first access (scan) will automatically generate a new one in TablePage

      try {
        const res = await fetch(
          `${apiUrl}/api/orders/search?table=${tableId}&sessionId=${sessionId}`
        );
        const data = await res.json();
        const orders = data.orders || [];

        // Check if there is an active order (e.g. inProgress, pending)
        const activeOrder = orders.some(
          (o) => o.status === "inProgress" || o.status === "pending"
        );
        if (activeOrder) {
          // Active command, you do nothing, the user can stay on the menu as long as they want!
          return;
        }

        // If there is none, check if the 30 min timeout has passed since the last activity
        if (orders.length) {
          const lastOrder = orders[orders.length - 1];
          const updatedAt = new Date(lastOrder.updatedAt);
          const now = new Date();
          const diff = (now - updatedAt) / (1000 * 60); // in munutes
          const timeoutLimit = 30;

          if (diff < timeoutLimit) {
            // It hasn't been 30 minutes yet, leave the user on the menu
            return;
          }
        }

        // If there is no command or the timeout has passed, delete the session and redirect!
        localStorage.removeItem("sessionId");
        localStorage.removeItem("cart");
        navigate(`/sessionExpired?table=${tableId}`);
      } catch (err) {
        console.error("Eroare la verificarea sesiunii:", err);
      }
    };

    checkSession();
  }, [tableId]);
};
