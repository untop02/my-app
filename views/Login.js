import React, {useContext, useEffect, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button} from '@rneui/themed';
import {Card} from '@rneui/base';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();
  const [toggleRegister, setToggleRegister] = useState(false);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      // hardcoded token validation
      const userData = await getUserByToken(token);
      console.log('userdata', userData);
      if (userData) {
        setIsLoggedIn(true);
        setUser(userData);
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Card>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {toggleRegister ? <RegisterForm /> : <LoginForm />}
        <Button
          onPress={() => {
            setToggleRegister(!toggleRegister);
          }}
        >
          {toggleRegister ? 'or login' : 'or register'}
        </Button>
      </KeyboardAvoidingView>
    </Card>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
