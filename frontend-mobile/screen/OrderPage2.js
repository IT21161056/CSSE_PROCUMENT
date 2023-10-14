import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, AsyncStorage, TouchableOpacity, Alert } from "react-native";
import uuid from 'react-native-uuid';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from "axios";
import { Ip } from "../Ip";

export default function OrderPage2({ route }) {

  const navigation = useNavigation();

  const [date, setDate] = useState(null);
  const { params } = useRoute();
  let item = params;

  const { order } = route.params;
  const [rDate, setRDate] = useState();
  console.log(order)
  
  useEffect(() => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    setDate(date);
  }, []);

  const [{ placedDate, productList, requiredDate, siteId,siteName, totalPrice }] = order;//destructure order object

  const transformedOrder = {
    placedDate,
    requiredDate,
    totalPrice,
    siteName,
    productList: productList.map(({ product, price, qnty, supplier, supplierName }) => ({
      product: product,
      price,
      qnty: qnty,
      supplier: supplier,
      supplierName: supplierName
    }))
  };

  const sendRequest = () => {
    axios.post(`http://${Ip}:8072/order/${siteId}`, transformedOrder).then((response) => {
      console.log(response.data)
      Alert.alert("Order placed")
      navigation.navigate("Orders")
    }).catch((err) => {
      Alert.alert("Error with place order")
      console.log(err)
    })
  }

  useEffect(() => {
    if (order && order.length > 0 && order[0].productList && order[0].productList.length > 0) {
      const [{ requiredDate, siteId }] = order;
      setRDate(requiredDate);
    }
  }, [order]);


  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.summary}>Order Summary</Text>

        <View style={styles.txt}>
          <View style={styles.tableRow1}>
            <Text style={styles.cell}>Product</Text>
            <Text style={styles.cell}>Supplier</Text>
            <Text style={styles.cell}>Qnty</Text>
            <Text style={styles.cell}>Uprice</Text>
          </View>

          {order.map((orderItem, index) => (
            <View key={index}>
              {orderItem.productList.map((product, productIndex) => (
                <View style={styles.tableRow} key={productIndex}>
                  <Text style={styles.txt1}>{` ${product.product}`}</Text>
                  <Text style={styles.txt1}>{` ${product.supplierName}`}</Text>
                  <Text style={styles.txt1}>{` ${product.qnty}`}</Text>
                  <Text style={styles.txt1}>{` ${product.price}`}</Text>
                </View>
              ))}
              <Text style={styles.order}>{`Placed date : ${orderItem.placedDate}`}</Text>
              <Text style={styles.order}>{`Required Date: ${rDate}`}</Text>
              <Text style={styles.order}>{`Site Name:  ${orderItem.siteName}`}</Text>
              <Text style={styles.total}>{`Order Cost:  Rs. ${orderItem.totalPrice}.00`}</Text>
            </View>
          ))}

        </View>
      </View>

      <View style={{ gap: 25, marginTop: 20 }} >
        <TouchableOpacity style={styles.confirm} title="Confirm" onPress={sendRequest}>
          <Text style={{ fontSize: 19, color: 'white' }} title='Confirm'>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.draft} title="Draft" onPress={() => { navigation.navigate("Draft") }}>
          <Text style={{ fontSize: 19, color: 'white' }} title='Draft'>Draft</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 5,
    margin: 20,
    borderColor: '#ffa366',
    gap: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 20
  },
  confirm: {
    gap: 25,
    marginTop: 20
  },
  txt: {
    fontSize: 15
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 2,
    padding: 10,
    gap: 40
  },
  cell: {
    textAlign: 'center',
    fontSize: 18
  },
  tableRow1: {
    flexDirection: 'row',
    gap: 45,
    marginLeft: 4,
    alignItems: 'center',
    padding: 10,
    borderColor: '#ccc',
  },
  draft: {
    margin: 60,
    gap: 15,
    borderRadius: 20
  },
  order: {
    marginLeft: 16,
    fontSize: 16,
    marginTop: 5,
  },
  total: {
    marginTop: 5,
    marginLeft: 16,
    fontSize: 18,
    marginTop: 5,
    fontWeight: 'normal',
  },
  summary: {
    fontSize: 20,
    marginLeft: 110,
    fontWeight: 'bold',
  },
  txt1: {
    fontSize: 16,
  },
  draft: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bfbfbf',
    marginLeft: 70,
    marginRight: 70,
    padding: 10,
    borderRadius: 10,
  },
  confirm: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffa366',
    marginLeft: 70,
    marginRight: 70,
    padding: 10,
    borderRadius: 10
  }

});