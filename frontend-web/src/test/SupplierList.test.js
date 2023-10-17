import React from 'react';
import axios from 'axios';
import { render, screen, waitFor, userEvent } from '@testing-library/react';
import SupplierList from '../pages/SupplierList';

jest.mock('axios');

describe('SupplierList Component', () => {
  beforeEach(() => {
    // Reset Axios mock state before each test
    jest.clearAllMocks();
  });

  it('should render SupplierList component', () => {
    render(<SupplierList />);
    expect(screen.getByText('Manage Suppliers')).toBeInTheDocument();
  });

  it('should load supplier data and display it', async () => {
    const sampleSupplierData = [
      {
        _id: '1',
        supplierName: 'Supplier 1',
        email: 'supplier1@example.com',
        location: 'Location 1',
        contactNumber: '123-456-7890',
        productList: [{ name: 'Product 1', price: 10, qty: 5 }],
        orderList: [],
      },
    ];

    // Mock the Axios call for fetching data
    axios.get.mockResolvedValue({ data: sampleSupplierData });

    render(<SupplierList />);

    // Wait for data to load
    await waitFor(() => expect(screen.getByText('Supplier Name')).toBeInTheDocument());
    expect(screen.getByText('Supplier 1')).toBeInTheDocument();
    expect(screen.getByText('supplier1@example.com')).toBeInTheDocument();
  });

  it('should filter suppliers based on search query', async () => {
    const sampleSupplierData = [
      {
        _id: '1',
        supplierName: 'Supplier 1',
        email: 'supplier1@example.com',
      },
      {
        _id: '2',
        supplierName: 'Supplier 2',
        email: 'supplier2@example.com',
      },
    ];

    // Mock the Axios call for fetching data
    axios.get.mockResolvedValue({ data: sampleSupplierData });

    render(<SupplierList />);

    // Type a search query into the input field
    const searchInput = screen.getByLabelText('Search');
    userEvent.type(searchInput, 'Supplier 1');

    expect(screen.getByText('Supplier 1')).toBeInTheDocument();
    expect(screen.queryByText('Supplier 2')).not.toBeInTheDocument();
  });

  it('should handle data fetching error', async () => {
    // Mock Axios call to simulate an error
    axios.get.mockRejectedValue(new Error('Fetching error'));

    render(<SupplierList />);

    // Wait for the error message to be displayed
    await waitFor(() =>
      expect(screen.getByText('An error occurred when fetching supplier data!!')).toBeInTheDocument()
    );
  });

  it('should handle PDF generation error', async () => {
    // Mock Axios calls to simulate an error during PDF generation
    axios.post.mockResolvedValue({});
    axios.get.mockRejectedValue(new Error('PDF generation error'));

    render(<SupplierList />);

    // Click the "Generate Report" button
    const generateReportButton = screen.getByText('Generate Report');
    userEvent.click(generateReportButton);

    // Wait for the error message to be displayed
    await waitFor(() => expect(screen.getByText('Error generating or downloading the PDF')).toBeInTheDocument());
  });
});
