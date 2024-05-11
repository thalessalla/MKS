import { render } from "@testing-library/react";
import Header from "./header";

describe("Header Component", () => {
  test("renders cart icon", () => {
    const { getByAltText } = render(<Header />);

    const cartIcon = getByAltText("Ícone do carrinho de compras");
    expect(cartIcon).toBeInTheDocument();
  });
});
