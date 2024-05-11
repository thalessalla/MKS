import { ListProducts } from "../../api/models/products";
import { useGetProducts } from "../../api/products";
import { Card } from "../../components/cards/card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ErrorImg from "../../assets/error.svg";

import "./home.scss";

function Home() {
  const { data, isFetching, error } = useGetProducts();

  if (error) {
    return (
      <>
        <div className="error-msg">
          <img src={ErrorImg} alt="Erro ao buscar os dados" />
          <h2>
            Ops, ocorreu um erro ao buscar os dados. <br /> Por favor, tente
            novamente mais tarde.
          </h2>
        </div>
      </>
    );
  }

  if (isFetching) {
    return (
      <>
        <div className="container-cards">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <li key={index}>
              <Skeleton height={350} width={250} />
            </li>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container-cards">
        {data.products.map((product: ListProducts, index: number) => (
          <li key={index}>
            <Card
              name={product.name}
              price={product.price}
              description={product.description}
              id={product.id}
              photo={product.photo}
            />
          </li>
        ))}
      </div>
    </>
  );
}

export default Home;
