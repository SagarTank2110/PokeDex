import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';

import styles from './style';

const Screen = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;
