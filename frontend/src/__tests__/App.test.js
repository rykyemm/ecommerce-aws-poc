import { render, screen } from '../test-utils';
import App from '../App';

// Mock the api service
jest.mock('../services/api');

test('renders app without crashing', () => {
  render(<App />);
  expect(screen).toBeDefined();
}); 