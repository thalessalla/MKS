import { render, screen } from "@testing-library/react";
import { act } from "@testing-library/react";
import Home from "./home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

vi.mock("../../contexts/cartContext", () => ({
  useCart: vi.fn(() => ({
    cart: [],
    removeFromCart: vi.fn(),
    addToCart: vi.fn(),
    itemSubtraction: vi.fn(),
  })),
}));

const mockProducts = [
  {
    id: 1,
    name: "Product 1",
    price: 10.0,
    description: "Description 1",
    photo: "photo.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 20.0,
    description: "Description 2",
    photo: "photo2.jpg",
  },
];

const useGetProductsMock = vi.fn();

describe("Home component", () => {
  beforeEach(() => {
    useGetProductsMock.mockReturnValue({});
  });

  it("should render loading skeletons initially", async () => {
    render(<Home />, { wrapper });

    const skeletons = await screen.findAllByRole("img", { name: /skeleton/i });

    expect(skeletons.length).toBe(8);
  });

  it("should render products when data is fetched successfully", async () => {
    useGetProductsMock.mockReturnValueOnce({
      data: { products: mockProducts },
      isFetching: false,
      error: null,
    });

    await act(async () => render(<Home />, { wrapper }));

    const productNames = screen.getAllByText(/Product/i);

    expect(productNames.length).toBe(mockProducts.length);
  });

  it("should render error message on error", async () => {
    useGetProductsMock.mockReturnValueOnce({
      data: null,
      isFetching: false,
      error: new Error("API Error"),
    });

    await act(async () => render(<Home />, { wrapper }));

    const errorMessage = screen.getByText(/Ops, ocorreu um erro/i);

    expect(errorMessage).toBeInTheDocument();
  });
});
