/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./tablePage.css";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getMenu } from "../../services/apiService";
const TablePage = () => {
  const { tableId } = useParams();
  const [sessionId, setSessionId] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (!tableId) { //If table Id isn't present, the function does not fetch
      return; 
    }

    let storedSessionId = localStorage.getItem("sessionId");

    if (!storedSessionId) {
      storedSessionId = uuidv4();
      localStorage.setItem("sessionId", storedSessionId);
    }
    setSessionId(storedSessionId);
    const fetchMenu = async () => {
      try {
        
        const response = await getMenu();
        setMenu(response);
        console.log("Menu Array: ", response);
      } catch (error) {
        console.log("Failed to fetch menu: ", error);
      }
    };
    fetchMenu();
  }, [tableId]);

  return (
   <div className="list-group">
  {menu.map(product => (
    <div className="list-group-item d-flex justify-content-between align-items-start py-2 px-2" key={product._id}>
      <div>
        <div className="fw-bold">{product.name}</div>
        <small className="text-muted">{product.description}</small>
      </div>
      <div className="text-end ms-2">
        <div className="fw-bold">{product.price} lei</div>
        {/* buton adaugă aici */}
      </div>
    </div>
  ))}
</div>
  );
};

export default TablePage;
