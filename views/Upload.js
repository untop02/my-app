import {Card} from '@rneui/base';
import {Button, Input} from '@rneui/themed';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia} from '../hooks/ApiHooks';

const Upload = () => {
  const [image, setImage] = useState(null);
  const [type, setType] = useState('image');
  const {postMedia} = useMedia();

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
    } catch (error) {
      console.error(error);
    }
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
        title="Upload"
        onPress={handleSubmit(upload)}
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

export default Upload;
