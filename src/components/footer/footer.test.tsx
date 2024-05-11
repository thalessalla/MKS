import { render } from "@testing-library/react";
import Footer from "./footer";

describe("Footer Component", () => {
  test("renders footer text", () => {
    const { getByText } = render(<Footer />);

    const footerText = getByText("MKS Sistemas © Todos os direitos reservados");
    expect(footerText).toBeInTheDocument();
  });
});
