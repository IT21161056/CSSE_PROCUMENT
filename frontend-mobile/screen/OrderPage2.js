import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';

export default function OrderPage2({ route }) {

  //catch the passing data from place Order page
  const [date, setDate] = useState(null);
  const { params } = useRoute();
  let item = params;
  const { order } = route.params;

  const [total, setTotal] = useState(0);

  console.log(order)

  order.forEach((order, index) => {
    console.log(`Order ${index + 1}:`);
    console.log('Prods:', order.prods);
    console.log('Selected Date:', order.selectedDate);
    console.log('Site:', order.site);
  });

  useEffect(() => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    setDate(date);
  }, []);




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
              {/* <Text>{`Order ${index + 1}:`}</Text> */}
              {orderItem.prods.map((product, productIndex) => (
                <View style={styles.tableRow} key={productIndex}>
                  <Text style={styles.txt1}>{` ${product.product}`}</Text>
                  <Text style={styles.txt1}>{` ${product.supplier}`}</Text>
                  <Text style={styles.txt1}>{` ${product.qnty}`}</Text>
                  <Text style={styles.txt1}>{` ${product.price}`}</Text>
                </View>
              ))}
              <Text style={styles.order}>{`Placed date : ${date}`}</Text>
              <Text style={styles.order}>{`Required Date: ${orderItem.selectedDate}`}</Text>
              <Text style={styles.order}>{`Site Name:  ${orderItem.site}`}</Text>
            </View>
          ))}

        </View>
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
  txt: {
    fontSize: 15
  },
  tableRow: {
    flexDirection: 'row',
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
  order: {
    marginLeft: 16,
    fontSize: 16,
    marginTop: 5,
  },
  summary: {
    fontSize: 20,
    marginLeft: 110,
    fontWeight: 'bold',
  },
  txt1: {
    fontSize: 16,
  }
});