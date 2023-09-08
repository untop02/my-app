import {useForm, Controller} from 'react-hook-form';
import {registerUser, useUser} from '../hooks/ApiHooks';
import React, {useContext} from 'react';
import {Card, Input, Button} from '@rneui/base';
import {Alert} from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const ProfileForm = ({user}) => {
  const {putUser, checkUsername} = registerUser();
  const {getUserByToken} = useUser();
  const {setUser} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {
      ...user,
      password: '',
      confirm_password: '',
    },
    mode: 'onBlur',
  });

  const update = async (updateData) => {
    console.log('Updating', updateData);
    try {
      delete updateData.confirm_password;
      for (const [i, value] of Object.entries(updateData)) {
        console.log(i, value);
        if (value === '') {
          delete updateData[i];
        }
      }
      console.log('toimiiko');
      const token = await AsyncStorage.getItem('userToken');
      console.log('token', token);
      const updateResult = await putUser(updateData, token);
      console.log('update response', updateResult);
      Alert.alert('Success', updateResult.message);
      const userData = await getUserByToken(token);
      setUser(userData);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <Card>
      <Controller
        control={control}
        rules={{
          minLength: {value: 3, message: 'min length is 3 characters'},
          validate: async (value) => {
            try {
              if (value.length < 3) {
                return;
              }
              const isAvailable = await checkUsername(value);
              return isAvailable ? isAvailable : 'Username taken';
            } catch (error) {
              console.error(error);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username?.message}
          />
        )}
        name="username"
      />
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          minLength: {value: 3, message: 'min length is 3 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          validate: (value) => {
            const {password} = getValues();
            if (password.length < 5) {
              return;
            }
            return value === password ? true : 'Passwords dont match';
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="confirm password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.confirm_password?.message}
          />
        )}
        name="confirm_password"
      />
      <Controller
        control={control}
        rules={{
          pattern: {
            value: /\S+@\S+\.\S+$/,
            message: 'must be a valid email',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.email?.message}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          minLength: {value: 3, message: 'min length is 3 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Full Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.full_name?.message}
          />
        )}
        name="full_name"
      />

      <Button title="Submit" onPress={handleSubmit(update)} />
    </Card>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.object,
};

export default ProfileForm;
