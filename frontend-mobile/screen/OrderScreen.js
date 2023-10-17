import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert,StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import OrderService from '../service/OrderService';  // Singleton service

const OrderScreen = () => {
  const [orderList, setOrderList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    OrderService.sendRequest() // set the fetched data to the state
      .then(response => setOrderList(response.data))
      .catch(error => {
        Alert.alert('Error with fetching Order List');
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.OrderScreen}>Order List</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
      {orderList.map((orderItem, index) => (
          <View key={index} style={styles.backGround}>
            <Text style={styles.orderId}>{`O_${index + 101}`}</Text>
            <View style={styles.tableRow1}>
              <Text style={styles.cell}>Product</Text>
              <Text style={styles.cell}>Supplier</Text>
              <Text style={styles.cell}>Qnty</Text>
              <Text style={styles.cell}>Uprice</Text>
            </View>
            {orderItem.productList.map((product, productIndex) => (
              <View key={productIndex} style={styles.tableRow}>
                <Text style={styles.txt1}>{`${product.product}`}</Text>
                <Text style={styles.txt1}>{`${product.supplierName}`}</Text>
                <Text style={styles.txt1}>{`${product.qnty}`}</Text>
                <Text style={styles.txt1}>{`Rs. ${product.price}.00`}</Text>
              </View>
            ))}
            <View style={styles.mainOrder}>
              <Text >{`Placed date : ${orderItem.placedDate}`}</Text>
              <Text >{`Required Date: ${orderItem.requiredDate}`}</Text>
              <Text >{`Site Name: ${orderItem.siteName}`}</Text>
              <Text style={styles.total}>{`Order Cost:  Rs. ${orderItem.totalPrice}.00`}</Text>
              <Text style={orderItem.status === 'waiting' ? styles.yellow : styles.green}>{`${orderItem.status}`}</Text>{/*if order greater 
              than 100000 show waiting and if less tha show placed label*/}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default OrderScreen;


const styles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  OrderScreen: {
    fontSize: 25,
    marginTop: 10
  },
  backGround: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    marginTop: 18,
    padding: 25,
    marginLeft: 20,
    marginRight: 20

  },
  mainOrder: {
    marginLeft: 10
  },
  ad: {
    marginLeft: 250,
    backgroundColor: 'gray',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40
  },
  ad2: {
    color: 'black',
  },
  green: {
    backgroundColor: '#00e600',
    position: 'absolute',
    left: 210,
    bottom: 1,
    borderRadius: 8,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15
  },
  yellow: {
    backgroundColor: '#ffb366',
    position: 'absolute',
    left: 210,
    bottom: 1,
    borderRadius: 8,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15
  },
  txt1: {
    marginLeft: 15
  },
  txt: {
    fontSize: 18,
  },
  tableRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderColor: '#ccc',
  },
  cell: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  orderId: {
    display: 'flex',
    marginLeft: 15
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,

  },

})