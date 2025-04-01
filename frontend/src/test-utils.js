import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

const AllTheProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <CartProvider>
        {children}
      </CartProvider>
    </BrowserRouter>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render }; 