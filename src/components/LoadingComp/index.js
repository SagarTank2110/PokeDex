import {View, ActivityIndicator} from 'react-native';
import React from 'react';

import styles from './style';

const LoadingComp = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingComp;
