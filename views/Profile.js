import React, {useContext, useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/app-config';

const Profile = (props) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getFilesByTag} = useTag();

  const logOut = async () => {
    console.log('profile, logout');
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };
  const laodAvatar = async () => {
    try {
      const avatars = await getFilesByTag('avatar_' + user.user_id);
      setAvatar(mediaUrl + avatars.pop().filename);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    laodAvatar();
  });
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile view</Text>
      <Button title="Log out!" onPress={logOut} />
      <Image
        style={styles.avatar}
        source={{
          uri: avatar,
        }}
      />
      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
      <Text>{user.full_name}</Text>
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
  avatar: {
    height: 300,
    width: 300,
  },
});

export default Profile;
