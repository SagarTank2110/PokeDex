import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Screens from '../screens';
import routes from './routes';

const PokemonStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.POKEMONTYPES}
        component={Screens.PokemonTypes}
      />
      <Stack.Screen name={routes.POKEDECK} component={Screens.PokeDeck} />
      <Stack.Screen
        name={routes.POKEMONDETAILS}
        component={Screens.PokemonDetails}
      />
      <Stack.Screen
        name={routes.POKEMONLISTITEM}
        component={Screens.PokemonListItem}
      />
    </Stack.Navigator>
  );
};

export default PokemonStack;
