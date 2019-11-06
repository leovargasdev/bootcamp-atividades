import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './pages/Home';
// import User from './pages/User';
// import Repository from './pages/Repository';

const Routes = createAppContainer(
  createStackNavigator({
    Home,
  })
);

export default Routes;
