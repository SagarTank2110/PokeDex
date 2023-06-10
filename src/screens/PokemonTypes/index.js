import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import useApi from '../../hooks/useApi';

import styles from './style';
import getRandomColor from '../../utils/getRandomColor';
import routes from '../../routes/routes';
import LoadingComp from '../../components/LoadingComp';
import colors from '../../constants/customColors';

const PokemonTypes = ({navigation}) => {
  const {data, isLoading, error} = useApi('https://pokeapi.co/api/v2/type');

  const handleTypePress = item => {
    navigation.navigate(routes.POKEDECK, {item});
  };

  const renderPokemonTypes = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handleTypePress(item)}
        style={[styles.listContainerBox, {backgroundColor: colors[item.name]}]}>
        <View>
          <Text style={styles.headings}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) return <LoadingComp />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.results}
        renderItem={renderPokemonTypes}
        numColumns={2}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

export default PokemonTypes;
