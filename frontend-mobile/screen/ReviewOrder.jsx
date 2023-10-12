import { useRoute } from "@react-navigation/native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioButton, TextInput } from "react-native-paper";

const ReviewOrder = ({ route }) => {
  const { params } = useRoute();
  const itemData = route.params.order;
  const [value, setValue] = React.useState();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tableColumns}>
        <Text style={{ ...styles.thead }}>Name</Text>
        <Text style={{ ...styles.thead }}>Supplier</Text>
        <Text style={{ ...styles.thead }}>Quantity</Text>
        <Text style={{ ...styles.thead }}>Complete status</Text>
      </View>
      <ScrollView scrollEnabled={true} style={{ height: 300 }}>
        {itemData.orderList.map((order) => (
          <View style={styles.tableColumns}>
            <Text style={{ ...styles.tbody }}>{order.item}</Text>
            <Text style={{ ...styles.tbody }}>{order.supplier}</Text>
            <Text style={{ ...styles.tbody }}>{order.quantity}</Text>
            <RadioButton.Group
              onValueChange={(newValue) => setValue(newValue)}
              value={value}
            >
              <View
                style={{
                  display: "flex",
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: 500,

                  flexDirection: "row",
                }}
              >
                <RadioButton value={true} />
                <Text>Complete</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: 500,

                  borderBottomColor: "grey",
                  borderStyle: "solid",
                  borderBottomWidth: 1,
                  flexDirection: "row",
                }}
              >
                <RadioButton value={false} />
                <Text>Incomplete</Text>
              </View>
            </RadioButton.Group>
          </View>
        ))}
      </ScrollView>
      <View>
        <Text>Add review:</Text>
        <TextInput></TextInput>
      </View>
    </SafeAreaView>
  );
};

export default ReviewOrder;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  tableColumns: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  thead: {
    width: "25%",
    display: "flex",
    textAlign: "center",
    fontSize: 15,
    fontWeight: 500,
    backgroundColor: "#FF9933",
    padding: 10,
    color: "white",
  },
  tbody: {
    width: "25%",
    display: "flex",
    textAlign: "center",
    fontSize: 15,
    fontWeight: 500,
    padding: 6,
    borderBottomColor: "grey",
    borderStyle: "solid",
    borderBottomWidth: 1,
    backgroundColor: "#e3e3e3",
  },
});
