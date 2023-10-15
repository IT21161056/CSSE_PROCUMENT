import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";

const TableRow = ({ order, getSubOrderId }) => {
  const [checked, setChecked] = useState(false);

  const setData = (id) => {
    getSubOrderId(id);
    setChecked(true);
  };
  return (
    <View style={styles.tableRow}>
      <View style={{ ...styles.rowData }}>
        <Text>{order.product}</Text>
      </View>
      <View style={{ ...styles.rowData }}>
        <Text>{order.supplierName}</Text>
      </View>
      <View style={{ ...styles.rowData }}>
        <Text>{order.qnty}</Text>
      </View>
      <View style={{ ...styles.rowData }}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setData(order._id);
          }}
          color="#111212"
        />
      </View>
    </View>
  );
};

export default TableRow;

const styles = StyleSheet.create({
  tableRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "#213455",
  },
  rowData: {
    width: "25%",
    display: "flex",
    textAlign: "center",
    marginBottom: "auto",
    marginTop: "auto",
    justifyContent: "center",
    height: 50,
    fontSize: 15,
    fontWeight: 500,
    padding: 6,
    borderBottomColor: "grey",
    borderStyle: "solid",
    borderBottomWidth: 1,
    // backgroundColor: "#e3e3e3",
  },
});
