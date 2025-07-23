import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useCallback, useMemo} from 'react';

import useApi from '../../hooks/useApi';
import styles from './style';
import routes from '../../routes/routes';
import LoadingComp from '../../components/LoadingComp';
import ErrorComp from '../../components/ErrorComp';
import colors from '../../constants/customColors';

const PokemonTypes = ({navigation}) => {
  const {data, isLoading, error, refetch} = useApi('https://pokeapi.co/api/v2/type');

  // Memoized navigation handler
  const handleTypePress = useCallback((item) => {
    navigation.navigate(routes.POKEDECK, {item});
  }, [navigation]);

  // Memoized render function
  const renderPokemonTypes = useCallback(({item}) => {
    const backgroundColor = colors[item.name] || '#6B7280'; // Fallback color
    
    return (
      <TouchableOpacity
        onPress={() => handleTypePress(item)}
        style={[styles.listContainerBox, {backgroundColor}]}
        activeOpacity={0.7}
      >
        <View>
          <Text style={styles.headings} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }, [handleTypePress]);

  // Memoized key extractor
  const keyExtractor = useCallback((item) => item.name, []);

  // Memoized data
  const pokemonTypes = useMemo(() => data?.results || [], [data?.results]);

  if (isLoading) return <LoadingComp />;

  if (error) {
    return (
      <ErrorComp 
        message="Failed to load Pokemon types" 
        onRetry={refetch}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonTypes}
        renderItem={renderPokemonTypes}
        numColumns={2}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={50}
        initialNumToRender={8}
        windowSize={10}
        // Pull to refresh
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </View>
  );
};

export default React.memo(PokemonTypes);
