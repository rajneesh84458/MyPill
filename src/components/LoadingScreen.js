import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, View, ActivityIndicator} from 'react-native';
import {COLORS} from '../utilities/medicineTab';

const LoadingScreen = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalView}>
        <ActivityIndicator size="small" color={COLORS.PRIMARY_COLOR} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingScreen;
