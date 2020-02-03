import React, { memo, useState, useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { AsyncStorage } from 'react-native';
import { _request } from '../core/request';

const Repositories = ({ navigation }) => {
  const [state, setState] = useState({
    repository: "facebook/react-native",
    error: '',
    username: global.username
  })

  const _findRepositories = () => {
    if (state.repository != '') {
      global.repository = state.repository
    }
  }

  useEffect(() => {
    fetchComment("request")
  }, ["request"]);

  const fetchComment = async (commnetId) => {
    if (global.repository != '') {
      const repo = global.repository;
      const result = await _request('GET', 'repos/' + repo);
      // console.log(result)
      if(result.commits_url)
      {
        const commits = await _request('GET', 'repos/' + repo + '/commits');
        console.log(commits)
      }
    }
  }

  return (
    <Background>
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
      <Button mode="contained" onPress={() => _findRepositories}>
        Search
      </Button>
    </Background>
  );
}

export default memo(Repositories);
