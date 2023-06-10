import {View, Text} from 'react-native';
import React from 'react';
import styles from './style';

const ErrorComp = ({message}) => {
  return (
    <View style={styles.container}>
      <Text>Error: {message}</Text>
    </View>
  );
};

export default ErrorComp;
