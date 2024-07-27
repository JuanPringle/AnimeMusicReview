import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import LogIn from '../Screens/Login';
import Home from '../Screens/Home';
import Details from '../Screens/Details';
import Songs from '../Screens/Songs';
import { useState } from 'react';

const Stack = createStackNavigator();

function StackNavigation() {
  const [name, setName] = useState(false);

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS, // Use SlideFromRightIOS preset for iOS-like animations
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 300,
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 300,
            },
          },
        },
      }}
    >
      {!name ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Songs" component={Songs} />
          <Stack.Screen name="Details" component={Details} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LogIn} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default StackNavigation;