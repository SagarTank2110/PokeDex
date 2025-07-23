import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import PokemonStack from './PokemonStack';
import store from '../store/configureStore';

const AppNavigator = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PokemonStack />
      </NavigationContainer>
    </Provider>
  );
};

export default AppNavigator;
