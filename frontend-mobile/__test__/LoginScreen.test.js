import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../screen/LoginScreen'
import axios from 'axios';

jest.mock('axios');

/*Test case for handle invalid login*/
describe('LoginScreen component', () => {
  it('handles failed login', async () => {
    // Mock the failed login response
    axios.post.mockRejectedValue({ message: 'Invalid credentials' });

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    // Enter invalid credentials
    fireEvent.changeText(getByPlaceholderText('Email'), 'invalid@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');

    // Click the Login button
    fireEvent.press(getByText('Login'));

    // Wait for the login process to complete
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `http://${Ip}:8072/siteManager/login`,
        { email: 'invalid@example.com', password: 'wrongpassword' }
      );
      // Assert that an error message is shown to the user
      expect(getByText('Login failed. Please check your credentials.')).toBeTruthy();
    });
  });
});
