import { useEffect, useState } from "react";
import { useCart } from "../../contexts/cartContext";
import "./cart.scss";

export default function Cart() {
  const { cart, removeFromCart, addToCart, itemSubtraction } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId);
  };

  const handleAddToCart = (product: any) => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      photo: product.photo,
      qtd: 0,
      value: 0,
    };
    addToCart(item);
  };

  const handleSubtraction = (product: any) => {
    const item = {
      qtd: product.qtd,
      id: product.id,
      name: product.name,
      price: product.price,
      photo: product.photo,
      value: product.value,
    };
    itemSubtraction(item);
  };

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += Number(item.price);
    });
    setTotalPrice(total);
  }, [cart]);

  return (
    <>
      <div className="container-cart-items">
        {cart.length === 0 && (
          <p className="msg-cart">Seu carrinho de compras está vazio</p>
        )}
        {cart.map((product) => (
          <div className="cart-item" key={product.id}>
            <div>
              <div className="product-name">
                <img src={product.photo} alt={product.name} />
                <p>{product.name}</p>
              </div>

              <div className="product-qtd">
                <p>Qtd</p>
                <div className="qtd-counter">
                  <button onClick={() => handleAddToCart(product)}>+</button>
                  <div>
                    <p>{product.qtd}</p>
                  </div>

                  <button onClick={() => handleSubtraction(product)}>-</button>
                </div>
              </div>
            </div>

            <div>
              <p className="product-price">
                R$
                {product.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  .replace(/\.00$/, "")}
              </p>
            </div>

            <button
              className="remove"
              onClick={() => handleRemoveItem(product.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div className="checkout-container">
        {totalPrice > 0 && (
          <div className="price-checkout">
            <div>
              <p>Total:</p>
            </div>
            <div>
              <p>
                R${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
