import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Tab from './navigation/Tab';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './navigation/StackNav';


export default function App() {
  return (
    <NavigationContainer>
     <StackNav/>
    </NavigationContainer>
  );
}


