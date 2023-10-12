import React from "react";
import { SafeAreaView, Text } from "react-native";

const ReviewOrder = ({ order }) => {
  const { params } = useRoute();
  const itemData = order.params.order;
  return (
    <SafeAreaView>
      <Text></Text>
    </SafeAreaView>
  );
};

export default ReviewOrder;
