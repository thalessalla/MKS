import React, { useState } from "react";
import { motion } from "framer-motion";
import "./cart.scss";
import { useCart } from "../../contexts/cartContext";
import CartIcon from "../../assets/cart.svg";
import Cart from "./cart";

function Drawer() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button className="cart-menu" onClick={toggleDrawer}>
        <img src={CartIcon} alt="Ícone do carrinho de compras" />
        <p>{cart.length}</p>
      </button>
      <motion.div
        className="drawer"
        initial={{ x: 600 }}
        animate={{ x: open ? 0 : 600 }}
        transition={{ type: "just", stiffness: 1000, damping: 80 }}
      >
        <div className="content-drawer">
          <div className="header-cart">
            <h2>
              Carrinho <br /> de compras
            </h2>
            <button className="close-btn" onClick={toggleDrawer}>
              X
            </button>
          </div>

          <Cart />
        </div>
        <button className="checkout-btn" disabled={cart.length === 0}>
          Finalizar pedido
        </button>
      </motion.div>
    </div>
  );
}

export default Drawer;
