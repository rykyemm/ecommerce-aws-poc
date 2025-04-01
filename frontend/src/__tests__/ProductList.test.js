import { render, screen, waitFor } from '../test-utils';
import ProductList from '../components/ProductList';

test('renders product list', async () => {
  render(<ProductList />);
  
  // Vérifie que le titre est présent
  expect(screen.getByText(/Produits/i)).toBeInTheDocument();
  
  // Attend que les produits soient chargés
  await waitFor(() => {
    expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    expect(screen.getByText('Samsung Galaxy S21')).toBeInTheDocument();
  });
}); 