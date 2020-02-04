import React, { memo, useState, useEffect } from 'react';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import ListView from '../components/ListView';
import { StyleSheet, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../core/theme';
import { _request } from '../core/request';

const Repositories = ({ navigation }) => {
  const [state, setState] = useState({
    dataSource: null,
    isLoading: false,
    error: "",
    repo: global.repository
  })
  
  useEffect(() => {
    fetchComment("request")
  }, ["request"]);

  const fetchComment = async (commnetId) => {
    if (global.repository != '') {

      setState({ ...state, isLoading: true })

      const result = await _request('GET', 'repos/' + state.repo);
      
      if (result.commits_url) {
        const commits = await _request('GET', 'repos/' + state.repo + '/commits');

        if (Array.isArray(commits)) {
          setState({ ...state, dataSource: commits, isLoading: false })
        } else {
          setState({ ...state, isLoading: false, error: "No Commits" })
        }

      } else {
        setState({ ...state, isLoading: false, error: "No Repository" })
      }
    }

  }

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('Dashboard')} />
      <Text style={styles.text}>{state.repo}</Text>
      {state.dataSource != null && <ListView data={state.dataSource}/>}
      {state.isLoading && <Header>Loading ...</Header>}
      {state.error != '' && <Header>{state.error}</Header>}
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
    // backgroundColor: "#e5e5e5"
  },
  separator: {
    height: 0.5, width: "100%", backgroundColor: "#000"
  },
  text: {
    width: "100%",
    position: "absolute",
    top: 7 + getStatusBarHeight(),
    left: 20,
    textAlign:"center",
    fontSize: 22,
    color: theme.colors.secondary,
    fontWeight: 'bold',
    paddingVertical: 0,
  }
});

export default memo(Repositories);
