import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
const ReviewedOrderCard = ({ item }) => {
  return (
    <View style={styles.orderCard}>
      <View style={{ ...styles.leftHalf, width: "60%" }}>
        <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Text style={{ fontSize: 20 }}>Order from :{item.site.siteName}</Text>
          <Text>Place Date :{item.placedDate}</Text>
          <Text>Required Date :{item.requiredDate}</Text>
        </View>
      </View>
      <View style={{ ...styles.rightHalf, width: "20%" }}>
        <Text
          style={{
            ...styles.approvedStatus(item.status),
            textAlign: "center",
            borderRadius: 5,
            padding: 2,
          }}
        >
          {item.status}
        </Text>
        <Text>{item.totalPrice}</Text>
      </View>
    </View>
  );
};

export default ReviewedOrderCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  orderCard: {
    width: "100%",
    backgroundColor: "#e3e3e3",

    borderRadius: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  leftHalf: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "#126273",
    height: "100%",
    gap: 10,
  },
  rightHalf: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
  },

  approvedStatus: (status) => ({
    backgroundColor:
      status === "approved"
        ? "#17A952"
        : status == "waiting"
        ? "#EFC220"
        : "#a92d17",
    color: "white",
    textTransform: "uppercase",
  }),
});
