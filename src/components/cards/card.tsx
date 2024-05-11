import { useCart } from "../../contexts/cartContext";
import "./card.scss";
import Shopping from "../../assets/shopping-bag.svg";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  name: string;
  price: number;
  description: string;
  id: number;
  photo: string;
}

export function Card({ name, price, description, id, photo }: Props) {
  const { addToCart } = useCart();

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
    </>
  );
}
