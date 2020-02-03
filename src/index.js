import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  HomeScreen,
  LoginScreen,
  Dashboard,
  Repositories
} from './screens';

const Router = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    Dashboard,
    Repositories
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
