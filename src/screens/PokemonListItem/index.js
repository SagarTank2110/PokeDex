import {View, Text, TouchableOpacity} from 'react-native';
import React, {useMemo} from 'react';
import FastImage from 'react-native-fast-image';

import styles from './style';
import getIdFromUrl from '../../utils/getIdFromUrl';

const PokemonListItem = ({item, onPress}) => {
  // Memoize the image URL to prevent recalculation
  const pokemonImg = useMemo(() => {
    const pokemonId = getIdFromUrl(item?.pokemon?.url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }, [item?.pokemon?.url]);

  // Memoize pokemon name
  const pokemonName = useMemo(() => {
    return item?.pokemon?.name || '';
  }, [item?.pokemon?.name]);

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <FastImage
        source={{
          uri: pokemonImg,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        style={styles.backgroundImg}
        resizeMode={FastImage.resizeMode.contain}
        fallback={true} // iOS fallback to Image component
        onError={() => {
          console.warn(`Failed to load image: ${pokemonImg}`);
        }}
      >
        <Text style={styles.pokemonName} numberOfLines={1}>
          {pokemonName}
        </Text>
      </FastImage>
    </TouchableOpacity>
  );
};

export default React.memo(PokemonListItem);
