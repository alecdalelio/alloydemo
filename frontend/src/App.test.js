import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Alloy Integration Demo', () => {
  render(<App />);
  const titleElement = screen.getByText(/Alloy Integration Demo/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders application form', () => {
  render(<App />);
  const formElement = screen.getByTestId('application-form');
  expect(formElement).toBeInTheDocument();
});

test('renders view demo button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/View Demo/i);
  expect(buttonElement).toBeInTheDocument();
});
