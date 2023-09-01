import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Single from '../views/Single';
import Login from '../views/Login';
import {MainContext} from '../contexts/MainContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabscreen = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  };

const StackScreen = () => {
    const {isLoggedIn} = useContext(MainContext);
    return (
        <Stack.Navigator>
            {isLoggedIn ? (
                <>
                    <Stack.Screen
                        name="Tabs"
                        component={Tabscreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen name="Single" component={Single} />
                </>
            ) : (
                // TODO: else add Login
                <Stack.Screen name="Login" component={Login} />
            )}
        </Stack.Navigator>
    );
};

const Navigator = () => {
    return (
        <NavigationContainer>
            <StackScreen />
        </NavigationContainer>
    );
};

export default Navigator;