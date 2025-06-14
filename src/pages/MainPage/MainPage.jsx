

import TablePage from "../Table/TablePage"
import { CartContext } from "../../context/cartContext";
import CartSticky from "../../components/Cart/CartSticky";
import { useState } from "react";
import Modal from "../../components/modal/Modal";
import Cart from "../../components/Cart/Cart";
import Navbar from "../../components/Navbar/Navbar";


const MainPage = () => {
  const [showCart, setShowCart] = useState(false);
  const openCart = () => {
    setShowCart(true);
  }
  const closeCart = () => {
    setShowCart(false);
  }

  return (
    <div className="main-container">
        <Navbar/>
      <TablePage/>
     
        <CartSticky onClick={openCart}/>

        
      <Modal isOpen={showCart} onRequestClose={closeCart}>
        <Cart onRequestClose={closeCart} />
      </Modal>
    </div>
  )
}

export default MainPage
