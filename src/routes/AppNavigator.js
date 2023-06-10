import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import PokemonStack from './PokemonStack';
import {Provider} from 'react-redux';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <PokemonStack />
    </NavigationContainer>
  );
};

export default AppNavigator;
