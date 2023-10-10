import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function RegisterScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.login}>Register</Text>

        <View style={{ gap: 3 }}>
          <Text style={styles.txt} title="username">Username</Text>
          <TextInput style={styles.lg} placeholder="Email"></TextInput>
          <Text style={styles.txt}title="email">Email</Text>
          <TextInput style={styles.lg} placeholder="Email"></TextInput>
          <Text style={styles.txt} title="password">Password</Text>
          <TextInput style={styles.lg} placeholder="Password"></TextInput>
        </View>

        <View style={styles.loginBtn}>
          <Button color='#ffa366' title="Register" onPress={() => navigation.navigate("Tabs")} />
        </View>
        <TouchableOpacity style={{ marginTop: 30 }}>
          <Text title="Switch to Register" onPress={() => navigation.navigate("Login")}>Already have an account? Switch to Login</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  login: {
    fontSize: 30,
    marginTop: 50,
    marginBottom: 50
  },
  lg: {
    height: 50,
    margin: 12,
    width: 350,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#ffa366',
  },
  loginBtn: {
    width: 230,
    marginTop: 20,
  },
  txt:{
    marginLeft:20,
    bottom:-10
  }
});