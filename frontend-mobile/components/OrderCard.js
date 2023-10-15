import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "react-native-paper";

export default function OrderCard({ item }) {
  const navigate = useNavigation();
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);

  const reviewOrder = () => {
    navigate.navigate("ReviewOrder", { order: item });
  };
  return (
    <TouchableOpacity onPress={reviewOrder} style={styles.container}>
      <View style={styles.orderCard}>
        <View style={{ width: "20%" }}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
            color="#111212"
          />
        </View>
        <View style={{ ...styles.leftHalf, width: "60%" }}>
          <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Text style={{ fontSize: 20 }}>Order 1</Text>
            <Text>Place Date :{item.placedDate}</Text>
            <Text>Place Date :{item.requiredDate}</Text>
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
    </TouchableOpacity>
  );
}

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
