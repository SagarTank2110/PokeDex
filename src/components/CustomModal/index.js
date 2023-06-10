import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import styles from './style';

const CustomModal = ({title, content, children}, ref) => {
  const [visible, setVisible] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => ({
    setVisible: value => setVisible(value),
  }));

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}></TouchableOpacity>
      <Modal visible={visible} animationType="fade" transparent>
        <View style={styles.container}>
          <View style={styles.modal}>
            {children}
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default forwardRef(CustomModal);
