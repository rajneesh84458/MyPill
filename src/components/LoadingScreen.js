import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../utilities/medicineTab';

const LoadingScreen = () => {
  return <ActivityIndicator size="large" color={COLORS.PRIMARY_COLOR} />;
};

export default LoadingScreen;
