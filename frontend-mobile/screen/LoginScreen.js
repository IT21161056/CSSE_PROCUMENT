import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { createElement, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ip } from "../Ip";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    console.log(credentials);
    await axios
      .post(`http://${Ip}:8072/siteManager/login`, credentials)
      .then((res) => {
        setCredentials({
          email: "",
          password: "",
        });
        navigation.navigate("Tabs");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.login}>Login</Text>

      <View>
        <Text style={styles.txt} title="email">
          Email
        </Text>
        <TextInput
          style={styles.lg}
          placeholder="Email"
          onChangeText={(e) =>
            setCredentials((prv) => {
              return {
                ...prv,
                email: e,
              };
            })
          }
        ></TextInput>
        <Text style={styles.txt} title="password">
          Password
        </Text>
        <TextInput
          style={styles.lg}
          placeholder="Password"
          onChangeText={(e) =>
            setCredentials((prv) => {
              return {
                ...prv,
                password: e,
              };
            })
          }
        ></TextInput>
      </View>

      <View style={styles.loginBtn}>
        <Button color="#ffa366" title="Login" onPress={login} />
      </View>
      <TouchableOpacity style={{ marginTop: 30 }}>
        <Text
          title="Switch to Register"
          onPress={() => navigation.navigate("Register")}
        >
          Don't have an account? Switch to Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}

//<Button title="Register" onPress={()=>navigation.navigate("Register")}/>
//<Button title="Tabs" onPress={()=>navigation.navigate("Tabs")}/>

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
});
