import axios from "axios";
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
import { Ip } from "../Ip";
import OrderCard from "../components/OrderCard";
import ReviewedOrderCard from "../components/ReviewedOrderCard";

const ReviewedOrders = () => {
  const [reviewedOrders, setReviewedOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://${Ip}:8072/orderReview`)
      .then((res) => {
        setReviewedOrders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={reviewedOrders}
        renderItem={({ item }) => <ReviewedOrderCard item={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ columnGap: 10 }}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ReviewedOrders;
