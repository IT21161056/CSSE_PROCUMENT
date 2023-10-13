import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, ScrollView } from "react-native";
import { Ip } from "../Ip";

export default function OrderScreen() {

  const [orderList, setOrderList] = useState([]);
  const sendRequest = () => {
    axios.get(`http://${Ip}:8072/order/`,).then((response) => {
      setOrderList(response.data)
    }).catch((err) => {
      Alert.alert("Error with fetching Order List")
      console.log(err)
    })
  }

  useEffect(() => {
    sendRequest();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.OrderScreen}>OrderScreen</Text>

      <ScrollView>
        {orderList.map((orderItem, index) => (
          <View key={index} style={styles.backGround}>
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
            <Text style={styles.order}>{`Placed date : ${orderItem.placedDate}`}</Text>
            <Text style={styles.order}>{`Required Date: ${orderItem.requiredDate}`}</Text>
            {/* <Text style={styles.order}>{`Site Name:  ${orderItem.site}`}</Text> */}
            <Text style={styles.total}>{`Order Cost:  Rs. ${orderItem.totalPrice}.00`}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

}

const styles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  OrderScreen: {
    fontSize: 25,
    marginTop: 10
  },
  backGround:{
    backgroundColor:'gray',
    borderRadius:10,
    marginTop:10
  },
  txt1:{
 marginLeft:10
  },
  txt: {
    fontSize: 18
  },
  tableRow1: {
    flexDirection: 'row',
    gap: 50,
    marginLeft: 4,
    alignItems: 'center',
    padding: 10,
    borderColor: '#ccc',
  },
  cell: {
    display: 'flex',
    
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom:10
 
   
  },

})