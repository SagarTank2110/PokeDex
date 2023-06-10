import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import React from 'react';

import styles from './style';
import getIdFromUrl from '../../utils/getIdFromUrl';
import FastImage from 'react-native-fast-image';

const PokemonListItem = ({item, onPress}) => {
  const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getIdFromUrl(
    item?.pokemon?.url,
  )}.png`;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FastImage
        source={{uri: pokemonImg}}
        style={styles.backgroundImg}
        resizeMode={FastImage.resizeMode.contain}>
        <Text style={styles.pokemonName}>{item.pokemon.name}</Text>
      </FastImage>
    </TouchableOpacity>
  );
};

export default PokemonListItem;
