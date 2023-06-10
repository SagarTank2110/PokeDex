import {View, Text, Image} from 'react-native';
import React from 'react';
import useApi from '../../hooks/useApi';

import styles from './style';
import LoadingComp from '../../components/LoadingComp';
import FastImage from 'react-native-fast-image';

const PokemonDetails = ({name, id}) => {
  const {data, isLoading, error} = useApi(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
  );
  console.log('🚀 ~ file: index.js:11 ~ PokemonDetails ~ data:', data);

  if (isLoading) {
    return <LoadingComp />;
  }

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.imageContainer}>
        <FastImage
          // source={{uri: data?.sprites?.front_default}}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data?.id}.png`,
          }}
          style={styles.image}
        />
      </View>
      <Text style={styles.content}>
        Base Experience: {data?.base_experience}
      </Text>
      <Text style={styles.content}>Weight: {data?.weight}</Text>
      <Text style={styles.content}>Height: {data?.height}</Text>
    </View>
  );
};

export default PokemonDetails;
