import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';

const HomeScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Sign in to GitHub</Header>

    {/* <Paragraph>
      Sign in to GitHub
    </Paragraph> */}
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Sign in
    </Button>
  </Background>
);

export default memo(HomeScreen);
