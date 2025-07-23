import React, {useRef, useState, useEffect, useCallback, useMemo} from 'react';
import {FlatList, View} from 'react-native';

import styles from './style';
import Screen from '../../components/Screen';
import useApi from '../../hooks/useApi';
import CustomModal from '../../components/CustomModal';
import PokemonDetails from '../PokemonDetails';
import PokemonListItem from '../PokemonListItem';
import LoadingComp from '../../components/LoadingComp';
import ErrorComp from '../../components/ErrorComp';
import {capitalizeFirstLetter} from '../../utils/stringUtils';

const PokeDeck = ({route, navigation}) => {
  const modalRef = useRef(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Memoize URL to prevent unnecessary re-renders
  const url = useMemo(() => {
    return route.params?.item?.url || '';
  }, [route.params?.item?.url]);

  const {data, isLoading, error, refetch} = useApi(url);

  // Set header title only once when component mounts
  useEffect(() => {
    if (route.params?.item?.name) {
      const name = capitalizeFirstLetter(route.params.item.name);
      navigation.setOptions({
        headerTitle: `${name} Type Pokémon`,
      });
    }
  }, [route.params?.item?.name, navigation]);

  // Memoized callback for item press
  const onItemPressed = useCallback((item) => {
    setSelectedPokemon(item.pokemon.name);
    modalRef.current?.setVisible(true);
  }, []);

  // Memoized render function for FlatList
  const renderPokemonItem = useCallback(({item}) => {
    return (
      <PokemonListItem 
        item={item} 
        onPress={() => onItemPressed(item)} 
      />
    );
  }, [onItemPressed]);

  // Memoized key extractor
  const keyExtractor = useCallback((item) => {
    return item.pokemon.name;
  }, []);

  // FlatList optimization props
  const getItemLayout = useCallback((data, index) => ({
    length: 150, // Approximate item height
    offset: 150 * index,
    index,
  }), []);

  // Handle pull to refresh
  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <LoadingComp />;

  if (error) {
    return (
      <ErrorComp 
        message={error.message} 
        onRetry={onRefresh}
      />
    );
  }

  return (
    <Screen>
      <View style={styles.listView}>
        <FlatList
          data={data?.pokemon || []}
          renderItem={renderPokemonItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          // Performance optimizations
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={10}
          windowSize={10}
          // Pull to refresh
          refreshing={isLoading}
          onRefresh={onRefresh}
          // Optional: if item heights are consistent
          // getItemLayout={getItemLayout}
        />
      </View>
      <CustomModal ref={modalRef}>
        {selectedPokemon && <PokemonDetails name={selectedPokemon} />}
      </CustomModal>
    </Screen>
  );
};

export default React.memo(PokeDeck);
