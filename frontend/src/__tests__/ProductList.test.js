import { render, screen } from '../test-utils';
import ProductList from '../components/ProductList';

const mockProducts = [
  {
    id: 1,
    name: "iPhone 13",
    price: 999.99,
    description: "Latest iPhone model",
    image_url: "iphone13.txt",
    category_name: "Smartphones",
    stock_quantity: 10
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    price: 899.99,
    description: "Latest Samsung model",
    image_url: "samsung.txt",
    category_name: "Smartphones",
    stock_quantity: 15
  }
];

test('renders product list', () => {
  render(<ProductList products={mockProducts} />);
  
  // Vérifie que les produits sont affichés
  expect(screen.getByText('iPhone 13')).toBeInTheDocument();
  expect(screen.getByText('Samsung Galaxy S21')).toBeInTheDocument();
  expect(screen.getByText('999.99 €')).toBeInTheDocument();
  expect(screen.getByText('899.99 €')).toBeInTheDocument();
});

test('displays no products message when products array is empty', () => {
  render(<ProductList products={[]} />);
  expect(screen.getByText('Aucun produit disponible.')).toBeInTheDocument();
}); 