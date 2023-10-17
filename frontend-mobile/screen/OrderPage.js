import React from 'react';
import OrderPageSingleton from '../components/OrderPageSingleton'; // Import the Singleton instance

const OrderPage2 = ({ route }) => {
  const OrderPage2Component = OrderPageSingleton; // Use the Singleton instance

  return <OrderPage2Component route={route} />;
};

export default OrderPage2;

