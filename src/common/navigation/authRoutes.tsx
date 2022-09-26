import React, {FunctionComponent} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'native-base';
import {Directory, Home} from '../../pages';
import HomeActive from '../assets/bottom-tabs/active/home.png';
import HomeInActive from '../assets/bottom-tabs/inactive/home.png';
import {createStackNavigator} from '@react-navigation/stack';

export type AuthStackParamList = {
  NestedHome: undefined;
  Home: undefined;
  Directory: {uuid: string};
};

export const AuthRoutes: FunctionComponent = () => {
  const Stack = createStackNavigator<AuthStackParamList>();
  const Tab = createBottomTabNavigator<AuthStackParamList>();

  const NestedHome = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Directory" component={Directory} />
      </Stack.Navigator>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="NestedHome"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 100,
        },
      }}>
      <Tab.Screen
        name="NestedHome"
        component={NestedHome}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image source={HomeActive} alt={'home active'} />
            ) : (
              <Image source={HomeInActive} alt={'home inactive'} />
            ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
