import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import OrderScreen from "../screen/OrderScreen";
import HomeScreen from "../screen/HomeScreen";
import PlaceOrder from "../screen/PlaceOrder";
import TrackOrder from "../screen/TrackOrder";
import DraftScreen from "../screen/DraftScreen";
import OrderPage2 from "../screen/OrderPage2";
import ReviewOrder from "../screen/ReviewOrder";
import UpdateOrder from "../screen/UpdateOrder"

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Tab() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 8,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#fff",
          borderRadius: 8,
          height: 50,
          ...styles.shadow,
        },
      }}
    >
      <Tabs.Screen
        name="PlaceOrder"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/placeorder.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? "#3E92CC" : "#a5bcc4",
                }}
              />
            </View>
          ),
        }}
      >
        {() => (
          <Stack.Navigator screenOptions={{ headerShown: "false" }}>
            <Stack.Screen
              name="Place Order"
              component={PlaceOrder}
              options={{ headerShown: "false" }}
            />
            <Stack.Screen
              name="Place2"
              component={OrderPage2}
              options={{ headerShown: "false" }}
            />
          </Stack.Navigator>
        )}
      </Tabs.Screen>

      <Tabs.Screen
        name="Orders"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/order.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? "#3E92CC" : "#a5bcc4",
                }}
              />
            </View>
          ),
        }}
      >
        {() => (
          <Stack.Navigator screenOptions={{ headerShown: "false" }}>
            <Stack.Screen
              name="Order List"
              component={OrderScreen}
              options={{ headerShown: "false" }}
            />
            <Stack.Screen
              name="UpdateOrder"
              component={UpdateOrder}
              options={{ headerShown: "false" }}
            />
          </Stack.Navigator>
        )}
      </Tabs.Screen>

      <Tabs.Screen
        name="Tracks"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/track.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? "#3E92CC" : "#a5bcc4",
                }}
              />
            </View>
          ),
        }}
      >
        {() => (
          <Stack.Navigator screenOptions={{ headerShown: "false" }}>
            <Stack.Screen
              name="track"
              component={TrackOrder}
              options={{ headerShown: "false" }}
            />
            <Stack.Screen
              name="ReviewOrder"
              component={ReviewOrder}
              options={{ headerShown: "false" }}
            />
          </Stack.Navigator>
        )}
      </Tabs.Screen>

      <Tabs.Screen
        name="Drafts"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/drafts.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? "#3E92CC" : "#a5bcc4",
                }}
              />
            </View>
          ),
        }}
      >
        {() => (
          <Stack.Navigator screenOptions={{ headerShown: "false" }}>
            <Stack.Screen name="Draft" component={DraftScreen} />
            <Stack.Screen
              name="UpdateOrder"
              component={UpdateOrder}
              options={{ headerShown: "false" }}
            />
          </Stack.Navigator>
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#3E92CC",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
});
