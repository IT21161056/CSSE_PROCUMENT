import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import OrderCard from "../components/OrderCard";
import Icon from "react-native-vector-icons/Ionicons";
// import { orders } from "../assets/data/db";
import axios from "axios";
import { Ip } from "../Ip";
import { useNavigation } from "@react-navigation/native";

export default function TrackOrder() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigation();
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`http://${Ip}:8072/order`)
        .then((res) => {
          console.log(res.data);
          setOrders(res.data);
        })
        .catch((err) => {});
    };
    fetch();
  }, []);

  const reviewedList = () => {
    navigate.navigate("ReviewedOrders");
  };

  return (
    <View>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.Btn} onPress={reviewedList}>
          <Icon name="document-text" size={20} color="black" />
          <Text style={{ color: "white", fontWeight: 600 }}>
            show Reviewed orders
          </Text>
        </TouchableOpacity>
      </View>
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
  topBar: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  Btn: {
    backgroundColor: "#FF9933",
    padding: 10,
    margin: 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    gap: 5,
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
