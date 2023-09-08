import React, {useContext, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/app-config';
import {Button} from '@rneui/themed';
import ProfileForm from '../components/ProfileForm';
import {Card, Text} from '@rneui/base';

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
    <ScrollView>
      <Card>
        <Card.Title>Profile view</Card.Title>
        <Card.Image
          source={{
            uri: avatar,
          }}
        />
        <Text>{user.username}</Text>
        <Text>{user.email}</Text>
        <Text>{user.full_name}</Text>
        <Button title="Log out!" onPress={logOut} />
        <ProfileForm user={user}/>
      </Card>
    </ScrollView>
  );
};

export default Profile;
