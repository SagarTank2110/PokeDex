import {View, TextInput, Button} from 'react-native';
import React, {useState} from 'react';

import styles from './style';
import Screen from '../../components/Screen';

const TextInputScreen = () => {
  const [text, setText] = useState('');

  const handleButtonPress = () => {
    console.log('Button pressed with text:', text);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter text here..."
            value={text}
            onChangeText={setText}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleButtonPress} />
        </View>
      </View>
    </Screen>
  );
};

export default TextInputScreen;
