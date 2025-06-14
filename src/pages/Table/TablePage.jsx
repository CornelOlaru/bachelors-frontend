/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "./tablePage.css";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getMenu } from "../../services/apiService";
import { CartContext } from "../../context/cartContext";
import ProductModal from "../ProductModal/ProductModal";
import Modal from "../../components/modal/Modal";
import Cart from "../../components/Cart/Cart";
import CartSticky from "../../components/Cart/CartSticky";
const TablePage = () => {
  const { tableId } = useParams();
  const [sessionId, setSessionId] = useState(null);
  const [menu, setMenu] = useState([]);
  const [modalType, setModalType] = useState(null); // "product" | "cart" | "login" etc.
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart, cart } = useContext(CartContext);
  const [activeProductId, setActiveProductId] = useState(null);
  //   const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
    // Dacă vrei, poți închide modalul aici:
    setModalType(null);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalType("product");
  };

  const openCartModal = (cart) => {
    setSelectedProduct(cart);
    setModalType("cart");
  };

  const closeModal = () => setModalType(null);
  useEffect(() => {
    if (!tableId) {
      //If table Id isn't present, the function does not fetch
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
    <div className="menu-list">
      {menu.map((product) => (
        <div className="menu-item" key={product._id}>
          {/* Stânga: info */}
          <div className="menu-info" onClick={() => openProductModal(product)}>
            <div className="menu-name">{product.name}</div>
            <div className="menu-weight">{product.weight} g</div>
            <div className="menu-desc">{product.description}</div>
            <div className="menu-price">{product.price} lei</div>
          </div>
          <div
            className="menu-img-actions"
            onClick={() => openProductModal(product)}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="menu-img"
            />
            {cart.find(item => item._id === product._id ) ? (
                <div className="menu-add-btn">{cart.find(item => item._id === product._id).quantity}</div>
            ) : (
                <button className="menu-add-btn" onClick={()=> openProductModal(product)}>+</button>
            )
            
            }
            <Modal isOpen={modalType === "product"} onRequestClose={closeModal}>
              <ProductModal
                product={selectedProduct}
                onAddToCart={handleAddToCart}
              />
            </Modal>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TablePage;
