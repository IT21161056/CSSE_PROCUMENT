import React from 'react';
import { render } from '@testing-library/react-native';
import OrderPage2 from '../screen/OrderPage';

// Mock the Singleton instance
jest.mock('../components/OrderPageSingleton', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('OrderPage2 component', () => {
  beforeEach(() => {
    OrderPageSingleton.mockClear();
  });

  it('renders correctly', () => {
    const route = { params: { /* mock route params if needed */ } };

    render(<OrderPage2 route={route} />);

    // Check if OrderPageSingleton was called with the correct route
    expect(OrderPageSingleton).toHaveBeenCalledWith(expect.objectContaining({ route }));
  });
});
