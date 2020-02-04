import React, { memo, useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Container from '../components/Container';
import { AsyncStorage } from 'react-native';

const Dashboard = ({ navigation }) => {
  const [state, setState] = useState({
    repository: "facebook/react-native",
    error: '',
    username: global.username
  })

  const _findRepositories = () => {
    console.log(state.repository)
    if (state.repository != '') {
      global.repository = state.repository;
      navigation.navigate('Repositories')
    } else {
      setState({ ...state, error: "Repository cannot be empty" })
    }
  }

  return (
    <Background>
      <Container>
        <Logo />
        <Header>{"Welcome"}</Header>
        <Paragraph>{state.username}</Paragraph>
        <TextInput
          label="Find a repository"
          returnKeyType="next"
          value={state.repository}
          onChangeText={text => setState({ ...state, repository: text })}
          error={!!state.error}
          errorText={state.error}
          autoCapitalize="none"
        />
        <Button mode="contained" onPress={_findRepositories}>
          Search
        </Button>
      </Container>
    </Background>
  );
}

export default memo(Dashboard);
