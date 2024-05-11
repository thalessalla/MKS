import "./App.scss";
import Home from "./pages/home/home";
import Header from "./components/header/header";
import { CartProvider } from "././contexts/cartContext";
import Footer from "./components/footer/footer";

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <Home />
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
