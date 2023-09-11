import {Card} from '@rneui/base';
import {Button, Input} from '@rneui/themed';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';

const Upload = () => {
  const upload = async (uploadData) => {
    console.log('upload', uploadData);
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
      <Card.Image
        source={{uri: 'http://placekitten.com/300/300'}}
        style={styles.image}
      />
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

      <Button title="Upload" onPress={handleSubmit(upload)} />
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
});

export default Upload;
