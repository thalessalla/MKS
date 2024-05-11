import "./header.scss";
import Drawer from "../cart/drawer";

function Header() {
  return (
    <>
      <nav className="header">
        <div>
          <div className="logo-header">
            <h1>MKS</h1>
            <p>Sistemas</p>
          </div>

          <div className="cart-icon">
            <Drawer />
          </div>
        </div>
      </nav>
    </>
  );
}
export default Header;
