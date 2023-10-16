import React from 'react';
import { render, screen } from '@testing-library/react';
import AddSuppliers from '../pages/AddSupplier';

test('renders the Add Suppliers component', () => {
  render(<AddSuppliers />);
  const heading = screen.getByText('Add Suppliers');
  expect(heading).toBeInTheDocument();
});

test('allows the user to enter supplierName', () => {
  render(<AddSuppliers />);
  const supplierNameInput = screen.getByLabelText('Full-Name');
  fireEvent.change(supplierNameInput, { target: { value: 'John Doe' } });
  expect(supplierNameInput.value).toBe('John Doe');
});
