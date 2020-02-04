import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import Container from '../components/Container';

const HomeScreen = ({ navigation }) => (
  <Background>
    <Container>
      <Logo />
      <Header>Sign in to GitHub</Header>

      <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
        Sign in
      </Button>
    </Container>
  </Background>
);

export default memo(HomeScreen);
