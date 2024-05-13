import { useCart } from "../../contexts/cartContext";
import "./card.scss";
import Shopping from "../../assets/shopping-bag.svg";
import "react-toastify/dist/ReactToastify.css";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

interface Props {
  name: string;
  price: number;
  description: string;
  id: number;
  photo: string;
}

export function Card({ name, price, description, id, photo }: Props) {
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = () => {
    const item = {
      id: id,
      name: name,
      price: price,
      photo: photo,
      qtd: 0,
      value: 0,
    };

    addToCart(item);
    handleClick();
  };

  return (
    <>
      <div className="card-product">
        <div>
          <div className="card-img">
            <img src={photo} alt={name} />
          </div>

          <div className="title-product">
            <h2>{name}</h2>
            <div className="price-card">
              <p>R${price.toString().replace(/\.00$/, "")}</p>
            </div>
          </div>
          <p>{description}</p>
        </div>

        <button onClick={handleAddToCart}>
          <img src={Shopping} alt="Ícone de adicionar no carrinho de compras" />
          COMPRAR
        </button>
      </div>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Produto adicionado ao carrinho
        </Alert>
      </Snackbar>
    </>
  );
}
