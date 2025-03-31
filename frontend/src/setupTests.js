// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'jest-environment-jsdom';

// Mock axios
jest.mock('axios');

// Mock auth and cart contexts
jest.mock('./context/AuthContext');
jest.mock('./context/CartContext'); 