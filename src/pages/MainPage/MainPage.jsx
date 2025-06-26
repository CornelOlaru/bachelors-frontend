

import TablePage from "../Table/TablePage"
import { CartContext } from "../../context/cartContext";
import CartSticky from "../../components/Cart/CartSticky";
import { useState } from "react";
import Modal from "../../components/modal/Modal";
import Cart from "../../components/Cart/Cart";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ScreenWarning from "../../components/ScreenWarning";
// import { useSessionCheck } from "../../services/sessionCheck";


const MainPage = () => {

const [showCart, setShowCart] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
const [searchResults, setSearchResults] = useState("");
  
  const openCart = () => {
    setShowCart(true);
  }
  const closeCart = () => {
    setShowCart(false);
  }

  return (
    <div div className="center-mobile">
    <ScreenWarning/>
    <div className="main-container ">
        <Navbar 
         searchQuery={searchQuery}
         setSearchQuery={setSearchQuery}
         setSearchResults={setSearchResults}
         />
      <TablePage 
       searchQuery= {searchQuery}
       searchResults={searchResults}
       />
     
        <CartSticky onClick={openCart}/>

        
      <Modal isOpen={showCart} onRequestClose={closeCart}>
        <Cart onRequestClose={closeCart} />
      </Modal>
      <Footer />
    </div>
       </div>
  )
}

export default MainPage
