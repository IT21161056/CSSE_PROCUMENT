// OrderService.js
import axios from 'axios';
import { Ip } from '../Ip';

/* Order service as a singleton to handle the API request that only responsible for send request*/
class OrderService {
  static instance = null;

  static getInstance() {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  sendRequest = async () => {
    try {
      const response = await axios.get(`http://${Ip}:8072/order/`);
      return response
    } catch (error) {
      throw error;
    }
  };
}

export default OrderService.getInstance();
