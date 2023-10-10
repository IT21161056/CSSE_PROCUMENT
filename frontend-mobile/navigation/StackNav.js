import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import Tab from './Tab';

const StackNav = () => {

    const Stack = createNativeStackNavigator();
    return (

        <Stack.Navigator screenOptions={{ headerShown: 'false' }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name='Tabs'
                options={{
                    headerShadowVisible: false,
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarHideOnKeyboard: true
                }}
                component={Tab} />
        </Stack.Navigator>

    )
}

export default StackNav;