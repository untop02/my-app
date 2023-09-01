import React, {useContext, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
    // props is needed for navigation
    const {setIsLoggedIn} = useContext(MainContext);

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('userToken');
        try {
            if(token === 'abcd'){
                setIsLoggedIn(true);
            }
        }catch(error){
            console.error(error);
        }
};

    useEffect(()=> {
        checkToken();
    }, []);

    const logIn = async () => {
        try{
        console.log('Login button pressed');
        await AsyncStorage.setItem('userToken', 'abc');
        setIsLoggedIn(true);
    }catch(error){
    console.error(error);
    };
    };
    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Button title="Sign in!" onPress={logIn} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

Login.propTypes = {
    navigation: PropTypes.object,
};

export default Login;