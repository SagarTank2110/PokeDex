import React, {useRef, useState, useEffect} from 'react';
import {FlatList, Button, View} from 'react-native';

import styles from './style';
import Screen from '../../components/Screen';
import useApi from '../../hooks/useApi';
import CustomModal from '../../components/CustomModal';
import PokemonDetails from '../PokemonDetails';
import PokemonListItem from '../PokemonListItem';
import LoadingComp from '../../components/LoadingComp';
import ErrorComp from '../../components/ErrorComp';

const PokeDeck = ({route, navigation}) => {
  let url = '';

  if (route.params) {
    url = route.params.item.url;
  }

  function capitalizeFirstLetter(word) {
    const [firstLetter, ...rest] = word;
    return `${firstLetter.toUpperCase()}${rest.join('')}`;
  }

  useEffect(() => {
    if (route.params) {
      const name = capitalizeFirstLetter(route.params.item.name);
      navigation.setOptions({
        headerTitle: name + ' Type Pokemons',
      });
    }
  }, []);

  const modalRef = useRef(null);
  const [title, setTitle] = useState('');

  // const {data, isLoading, error} = useApi('https://pokeapi.co/api/v2/pokemon/');
  const {data, isLoading, error} = useApi(url);

  const handleNextPokemons = () => {
    console.log('Handle next is pressed');
  };

  const onItemPressed = item => {
    setTitle(item.pokemon.name);
    modalRef.current?.setVisible(true);
  };

  const renderList = ({item}) => {
    return <PokemonListItem item={item} onPress={() => onItemPressed(item)} />;
  };

  if (isLoading) return <LoadingComp />;

  if (error) return <ErrorComp message={error.message} />;

  return (
    <Screen>
      <View style={styles.listView}>
        <FlatList
          data={data?.pokemon}
          renderItem={renderList}
          keyExtractor={item => item.pokemon.name}
          numColumns={2}
          contentContainerStyle={styles.listContent}
        />
      </View>
      <CustomModal ref={modalRef}>
        <PokemonDetails name={title} />
      </CustomModal>
      {/* <View style={styles.buttonContainer}>
        <Button title="Next" onPress={handleNextPokemons} />
      </View> */}
    </Screen>
  );
};

export default PokeDeck;
