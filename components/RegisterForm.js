import {Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {registerUser} from '../hooks/ApiHooks';
import React from 'react';
import {Card, Input, Button} from '@rneui/base';

const RegisterForm = () => {
  const {postUser, checkUsername} = registerUser();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });

  const register = async (registerData) => {
    try {
      const registerResponse = await postUser(registerData);
      console.log('register response', registerResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
          validate: async (value) => {
            try {
              const isAvailable = await checkUsername(value);
              console.log(value);
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
      {errors.username?.type === 'required' && <Text>This is required.</Text>}
      {errors.username?.type === 'minLength' && (
        <Text>min length is 3 characters</Text>
      )}
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Full Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="full_name"
      />

      <Button title="Submit" onPress={handleSubmit(register)} />
    </Card>
  );
};

export default RegisterForm;
