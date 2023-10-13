import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  PaperProvider,
  Portal,
  Modal,
  TextInput,
} from "react-native-paper";
import TableRow from "../components/TableRow";
import axios from "axios";

const ReviewOrder = ({ route }) => {
  const { params } = useRoute();
  const [visible, setVisible] = React.useState(false);
  const [review, setReview] = useState("");
  const [completeSubOrders, setCompleteSubOrders] = useState([]);

  const getSubOrderId = (id) => {
    setCompleteSubOrders([...completeSubOrders, id]);
  };
  const itemData = route.params.order;

  const submit = () => {
    const reviewedOrder = {
      review: review,
    };

    axios
      .post("http://localhost:8072/reviewedOrder")
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.tableColumns}>
          <Text style={{ ...styles.thead }}>Name</Text>
          <Text style={{ ...styles.thead }}>Supplier</Text>
          <Text style={{ ...styles.thead }}>Quantity</Text>
          <Text style={{ ...styles.thead }}>Complete status</Text>
        </View>
        <ScrollView scrollEnabled={true} style={{ height: 300 }}>
          {itemData.orderList.map((order, index) => (
            <TableRow key={index} order={order} getSubOrderId={getSubOrderId} />
          ))}
        </ScrollView>
        <View style={styles.infoSection}>
          <View style={styles.singleRow}>
            <Text style={styles.label}>Place date:</Text>
            <Text style={styles.data}>{"2023/10/10"}</Text>
          </View>
          <View style={styles.singleRow}>
            <Text style={styles.label}>Order required:</Text>
            <Text style={styles.data}>{"2023/10/20"}</Text>
          </View>
          <View style={styles.singleRow}>
            <Text style={styles.label}>Site name:</Text>
            <Text style={styles.data}>{"Malabe"} </Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity>
            <Button
              textColor="#426252"
              compact={true}
              mode="outlined"
              uppercase
              dark={true}
              style={{ paddingLeft: 30, paddingRight: 30 }}
              onPress={() => setVisible(true)}
            >
              Add note
            </Button>
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              textColor="white"
              compact={true}
              mode="elevated"
              buttonColor="#426252"
              uppercase
              style={{ paddingLeft: 30, paddingRight: 30 }}
              onPress={submit}
            >
              Save
            </Button>
          </TouchableOpacity>
        </View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={styles.modal}
          >
            <TextInput
              mode="outlined"
              label="add review"
              onChangeText={(e) => setReview(e)}
            />
          </Modal>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
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

    fontSize: 15,
    fontWeight: 500,
    backgroundColor: "#FF9933",
    padding: 6,
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
  modal: { backgroundColor: "white", padding: 20 },
  infoSection: {
    marginTop: 20,
    width: "100%",
  },
  singleRow: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },

  label: {
    width: "50%",
    fontSize: 20,
  },
  data: {
    width: "50%",
    fontSize: 20,
  },
  addNoteBtn: {
    color: "white",
    width: "fit-content",
    display: "flex",
    textAlign: "center",
    flexDirection: "row",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
});
