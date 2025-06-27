/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useMemo, useState } from "react";
import "./tablePage.css";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getMenu } from "../../services/apiService";
import { CartContext } from "../../context/cartContext";
import ProductModal from "../ProductModal/ProductModal";
import Modal from "../../components/modal/Modal";
import Cart from "../../components/Cart/Cart";
import CartSticky from "../../components/Cart/CartSticky";
const TablePage = ({ searchQuery, searchResults }) => {
  const { tableId } = useParams();
  const [sessionId, setSessionId] = useState(null);
  const [menu, setMenu] = useState([]);
  const [modalType, setModalType] = useState(null); // "product" | "cart" | "login" etc.
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart, cart } = useContext(CartContext);
  const [activeProductId, setActiveProductId] = useState(null);
  const navigate = useNavigate();
  const guestToken = localStorage.getItem("guestToken");
  const apiUrl = import.meta.env.VITE_DEV_API_BASE_URL;

  const isAuthenticated = !!localStorage.getItem("token");

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalType("product");
  };
  const closeModal = () => {
    setSelectedProduct(null);
    setModalType(null);
  };
  const filteredMenu = searchResults
    ? menu.filter(
        (item) =>
          item.name.toLowerCase().includes(searchResults.toLowerCase()) ||
          item.description.toLowerCase().includes(searchResults.toLowerCase())
      )
    : [];

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
    setModalType(null);
  };

  // const openCartModal = (cart) => {
  //   setSelectedProduct(cart);
  //   setModalType("cart");
  // };

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
        const response = await getMenu(guestToken);
        setMenu(response);
        console.log("Menu Array: ", response);
      } catch (error) {
        console.log("Failed to fetch menu: ", error);
      }
    };
    fetchMenu();
  }, [tableId, isAuthenticated]);

  const normalize = (str) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const categories = useMemo(() => {
    const desiredOrder = [
      "mic-dejun",
      "pranz",
      "cina",
      "desert",
      "bauturi-nealcoolice",
      "bauturi-alcoolice",
    ];
    return desiredOrder.filter((desiredCat) =>
      menu.some((p) => normalize(p.category) === normalize(desiredCat))
    );
  }, [menu]);
  return (
    <div className="nav-categories">
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2 className="category-title">Produse găsite:</h2>
          {filteredMenu.length > 0 ? (
            filteredMenu.map((product) => (
              <div className="menu-item" key={product._id}>
                <div
                  className="menu-info"
                  onClick={() => openProductModal(product)}
                >
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
                  {cart.find((item) => item._id === product._id) ? (
                    <div className="menu-add-btn">
                      {cart.find((item) => item._id === product._id).quantity}
                    </div>
                  ) : (
                    <button
                      className="menu-add-btn"
                      onClick={() => openProductModal(product)}
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Niciun produs găsit.</p>
          )}
        </div>
      )}

      <div className="menu-list">
        {categories.map((cat) => (
          <div key={cat} id={`cat-${cat}`} className="category-section">
            <h2 className="category-title">
              {cat.replace(/-/g, " ").toUpperCase()}
            </h2>
            {menu
              .filter((product) => product.category === cat)
              .map((product) => (
                <div className="menu-item" key={product._id}>
                  <div
                    className="menu-info"
                    onClick={() => openProductModal(product)}
                  >
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
                    {cart.find((item) => item._id === product._id) ? (
                      <div className="menu-add-btn">
                        {cart.find((item) => item._id === product._id).quantity}
                      </div>
                    ) : (
                      <button
                        className="menu-add-btn"
                        onClick={() => openProductModal(product)}
                      >
                        +
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalType === "product"}
        onRequestClose={closeModal}
        size="100"
      >
        <ProductModal product={selectedProduct} onAddToCart={handleAddToCart} />
      </Modal>
    </div>
  );
};

export default TablePage;
