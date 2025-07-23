import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import styles from './style';

const ErrorComp = ({message = 'Something went wrong', onRetry}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={onRetry}
          activeOpacity={0.7}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrorComp;
