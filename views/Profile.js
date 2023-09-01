import React, {useContext} from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = (props) => {
  const {setIsLoggedIn} = useContext(MainContext);
  const logOut = async () => {
    console.log('profile, logout');
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile view</Text>
      <Button title="Log out!" onPress={logOut} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Profile;