import {View, Text} from 'react-native';
import React, {useMemo} from 'react';

import useApi from '../../hooks/useApi';
import styles from './style';
import LoadingComp from '../../components/LoadingComp';
import ErrorComp from '../../components/ErrorComp';
import OptimizedImage from '../../components/OptimizedImage';
import {formatPokemonName, formatWeight, formatHeight} from '../../utils/stringUtils';

const PokemonDetails = ({name, id}) => {
  // Memoize the API URL
  const apiUrl = useMemo(() => {
    const identifier = id || name;
    return identifier ? `https://pokeapi.co/api/v2/pokemon/${identifier}` : null;
  }, [name, id]);

  const {data, isLoading, error, refetch} = useApi(apiUrl);

  // Memoize the image URL
  const imageUrl = useMemo(() => {
    if (!data?.id) return null;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
  }, [data?.id]);

  // Memoize formatted name
  const formattedName = useMemo(() => {
    return formatPokemonName(name);
  }, [name]);

  if (isLoading) {
    return <LoadingComp />;
  }

  if (error) {
    return (
      <ErrorComp 
        message={`Failed to load ${formattedName} details`} 
        onRetry={refetch}
      />
    );
  }

  if (!data) {
    return (
      <View style={styles.modalContainer}>
        <Text style={styles.errorText}>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.title}>{formattedName}</Text>
      
      {imageUrl && (
        <View style={styles.imageContainer}>
          <OptimizedImage
            source={{
              uri: imageUrl,
              priority: 'high',
              cache: 'immutable',
            }}
            style={styles.image}
            placeholder={true}
          />
        </View>
      )}
      
      <View style={styles.statsContainer}>
        <Text style={styles.content}>
          Base Experience: {data.base_experience || 'Unknown'}
        </Text>
        <Text style={styles.content}>
          Weight: {formatWeight(data.weight)}
        </Text>
        <Text style={styles.content}>
          Height: {formatHeight(data.height)}
        </Text>
        
        {data.types?.length > 0 && (
          <View style={styles.typesContainer}>
            <Text style={styles.content}>Types:</Text>
            {data.types.map((type, index) => (
              <Text key={index} style={styles.typeText}>
                {type.type.name}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default React.memo(PokemonDetails);
