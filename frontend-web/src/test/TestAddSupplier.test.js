import React from 'react';
import { render, screen } from '@testing-library/react';
import AddSupplier from '../pages/AddSupplier';

test('renders the Add Suppliers component', () => {
  render(<AddSupplier />);
  const heading = screen.getByText('Add Suppliers');
  expect(heading).toBeInTheDocument();
});

test('allows the user to enter supplierName', () => {
  render(<AddSupplier />);
  const supplierNameInput = screen.getByLabelText('Full-Name');
  fireEvent.change(supplierNameInput, { target: { value: 'John Doe' } });
  expect(supplierNameInput.value).toBe('John Doe');
});

test('submits the form with correct data', async () => {
  render(<AddSupplier />);
  const supplierNameInput = screen.getByLabelText('Full-Name');
  fireEvent.change(supplierNameInput, { target: { value: 'John smith' } });

  const submitButton = screen.getByRole('button', { name: /Add Supplier/ });
  fireEvent.click(submitButton);

  // Mock the axios post request
  axios.post.mockResolvedValue({ data: 'Successfully added supplier' });

  // Wait for the success message or similar to appear
  const successMessage = await screen.findByText('Supplier added successfully!!');
  expect(successMessage).toBeInTheDocument();
});