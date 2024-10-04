import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './src/home';
import Signup from './src/signup';
import Login from './src/login';
import TouristMain from './src/touristMain';
import AddSite from './src/addSite';
import Bookmarks from './src/bookmarks';
import Jeita from './src/jeita';

const Stack = createNativeStackNavigator();

function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TouristMain"
          component={TouristMain}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddSite"
          component={AddSite}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Bookmarks"
          component={Bookmarks}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Jeita"
          component={Jeita}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Root;

AppRegistry.registerComponent(appName, () => Root);
