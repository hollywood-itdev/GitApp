import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, AsyncStorage, Alert } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import Container from '../components/Container';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import { _request } from '../core/request';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: 'snowman718@yandex.com', error: '' });
  const [password, setPassword] = useState({ value: 'Iambug27@', error: '' });
  const [state, setState] = useState({
    statusText: "Welcome back."
  })

  const _onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    AsyncStorage.setItem("email", email.value)
    AsyncStorage.setItem("password", password.value)

    const result = await _request("GET", "user");

    if (result == null || result.error) {
      Alert.alert(result.error.message || "Error")
      setState({
        ...state,
        statusText: result.error.message || "Error",
      })
      setEmail({ value: '', error: '' })
      setPassword({ value: '', error: '' })
      return;
    }

    global.username = result.login || "User"
    navigation.navigate('Dashboard');
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} title={"Login Page"}/>
      <Container>

        <Logo />

        <Header>{state.statusText}</Header>

        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        <Button mode="contained" onPress={_onLoginPressed}>
          Sign in
        </Button>
      </Container>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
