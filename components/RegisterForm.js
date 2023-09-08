import {useForm, Controller} from 'react-hook-form';
import {registerUser} from '../hooks/ApiHooks';
import React from 'react';
import {Card, Input, Button} from '@rneui/base';

const RegisterForm = () => {
  const {postUser, checkUsername} = registerUser();

  const {
    control,
    handleSubmit,
    getValues,
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
          minLength: {value: 3, message: 'min length is 3 characters'},
          required: {value: true, message: 'this is required'},
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
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: {value: true, message: 'is required'},
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
          required: {value: true, message: 'is required'},
          validate: (value) => {
            const {password} = getValues();
            // console.log('getValues: ', values);
            console.log(password);
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
          required: {value: true, message: 'is required'},
          pattern: {
            value: /@/,
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
          required: true,
          minLength: {value: 3, message: 'min length is 3 characters'},
          required: {value: true, message: 'this is required'},
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

      <Button title="Submit" onPress={handleSubmit(register)} />
    </Card>
  );
};

export default RegisterForm;
