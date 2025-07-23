import React, {useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './style';

const OptimizedImage = ({
  source,
  style,
  resizeMode = FastImage.resizeMode.contain,
  placeholder = true,
  fallbackColor = '#f0f0f0',
  children,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <View style={[style, styles.container]}>
      <FastImage
        source={source}
        style={[style, error && styles.errorImage]}
        resizeMode={resizeMode}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        fallback={true}
        {...props}
      >
        {children}
      </FastImage>
      
      {loading && placeholder && !error && (
        <View style={[styles.placeholder, style, {backgroundColor: fallbackColor}]}>
          <ActivityIndicator size="small" color="#999" />
        </View>
      )}
      
      {error && (
        <View style={[styles.errorContainer, style, {backgroundColor: fallbackColor}]}>
          <View style={styles.errorIcon} />
        </View>
      )}
    </View>
  );
};

export default React.memo(OptimizedImage);