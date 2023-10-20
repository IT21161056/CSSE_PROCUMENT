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
        _id: '6528eb3154ff334565b6d79d',
        supplierName: 'Vikum viraj	',
        email: 'viraj12345@gmail.com	',
        location: 'Colombo',
        contactNumber: '0771575982',
        productList: [{ name: 'Sand', price: 2000, qty: 60 }],
        orderList: [],
      },
    ];

    // Mock the Axios call for fetching data
    axios.get.mockResolvedValue({ data: sampleSupplierData });

    render(<SupplierList />);

    // Wait for data to load
    await waitFor(() => expect(screen.getByText('Supplier Name')).toBeInTheDocument());
    expect(screen.getByText('Vikum viraj')).toBeInTheDocument();
    expect(screen.getByText('viraj12345@gmail.com')).toBeInTheDocument();
  });

  it('should filter suppliers based on search query', async () => {
    const sampleSupplierData = [
      {
        _id: '6528eb3154ff334565b6d79d',
        supplierName: 'Vikum viraj',
        email: 'viraj@12345@gmail.com',
      },
      {
        _id: '6528eb8654ff334565b6d7a5',
        supplierName: 'pasindu perakum',
        email: 'pasindu@gmail.com',
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
