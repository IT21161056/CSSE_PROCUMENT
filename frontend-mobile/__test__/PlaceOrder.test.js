import React from 'react';
import { create } from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native';
import PlaceOrder from '../screen/PlaceOrder';

// Mock NavigationContainer and useNavigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const tree = create(<NavigationContainer><PlaceOrder /></NavigationContainer>);

test('snapshot', () => {
  expect(tree).toMatchSnapshot();
});
