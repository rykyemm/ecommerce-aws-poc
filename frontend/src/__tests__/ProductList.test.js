import { render, screen, waitFor } from '@testing-library/react';
import ProductList from '../components/ProductList';
import { BrowserRouter } from 'react-router-dom';

test('renders product list', async () => {
  render(
    <BrowserRouter>
      <ProductList />
    </BrowserRouter>
  );
  
  // Vérifie que le titre est présent
  expect(screen.getByText(/Produits/i)).toBeInTheDocument();
  
  // Attend que les produits soient chargés
  await waitFor(() => {
    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
  });
}); 