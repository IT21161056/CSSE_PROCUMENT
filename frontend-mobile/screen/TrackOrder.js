import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import OrderCard from "../components/OrderCard";
// import { orders } from "../assets/data/db";
import axios from "axios";

export default function TrackOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("http://192.168.1.100:8072/order")
        .then((res) => {
          console.log(res.data);
          setOrders(res.data);
        })
        .catch((err) => {});
    };
    fetch();
  }, []);

  console.log(orders);

  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderCard item={item} />}
        keyExtractor={(item) => item._id}
        // contentContainerStyle={{ columnGap: 10 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    fontSize: 30,
    marginTop: 100,
    marginBottom: 50,
  },
  lg: {
    height: 50,
    margin: 12,
    width: 350,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: "#ffa366",
  },
  loginBtn: {
    width: 230,
    marginTop: 20,
  },
  txt: {
    marginLeft: 20,
    fontSize: 16,
  },
  orderCard: {
    width: "100%",
    backgroundColor: "#123456",
    height: 20,
    marginBottom: 10,
  },
});
