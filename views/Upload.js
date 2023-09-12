import {Card} from '@rneui/base';
import {Button, Input} from '@rneui/themed';
import React, {useContext, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Alert, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia, useTag} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {appId, placeholderImage} from '../utils/app-config';

const Upload = ({navigation}) => {
  const {update, setUpdate} = useContext(MainContext);
  const [image, setImage] = useState(placeholderImage);
  const [type, setType] = useState('image');
  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setType(result.assets[0].type);
    }
  };
  const upload = async (uploadData) => {
    const formData = new FormData();
    formData.append('title', uploadData.title);
    formData.append('description', uploadData.description);
    const filename = image.split('/').pop();

    let fileExtension = filename.split('.').pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;

    formData.append('file', {
      uri: image,
      name: 'kuva.jpg',
      type: `${type}/${fileExtension}`,
    });

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postMedia(formData, token);
      console.log('lataus', response);
      await postTag(
        {
          file_id: response.file_id,
          tag: appId,
        },
        token,
      );
      setUpdate(!update);
      Alert.alert('Upload', `${response.message}, ${response.file_id}`, [
        {
          text: 'Ok',
          onPress: () => {
            resetForm;
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setImage(placeholderImage);
    setType('image');
    reset();
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onBlur',
  });

  return (
    <Card>
      {type === 'image' ? (
        <Card.Image source={{uri: image}} style={styles.image} />
      ) : (
        <Video
          source={{uri: image}}
          style={styles.image}
          useNativeControls
          isLooping
        />
      )}

      <Card.Title>Upload</Card.Title>
      <Controller
        control={control}
        rules={{
          required: true,
          required: {value: true, message: 'This is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.title?.message}
          />
        )}
        name="title"
      />

      <Controller
        control={control}
        rules={{
          minLength: {value: 10, message: 'Minimum 10 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Description (optional)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.description?.message}
          />
        )}
        name="description"
      />
      <Button title="Choose Media" onPress={pickImage} style={styles.button} />
      <Button
        loading={loading}
        disabled={
          image === placeholderImage || errors.description || errors.title
        }
        title="Upload"
        onPress={handleSubmit(upload)}
        style={styles.button}
      />
      <Button
        title="Reset Form"
        onPress={resetForm}
        color={'error'}
        style={styles.button}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  button: {
    marginBottom: 5,
  },
});

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
