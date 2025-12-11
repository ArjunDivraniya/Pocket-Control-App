import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../theme';

const LoadingScreen = () => {
  return (
    <LinearGradient colors={[COLORS.background, '#E9D5FF']} style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.text}>Checking account...</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginTop: 20, fontSize: 16, color: COLORS.textDark, fontWeight: '500' }
});

export default LoadingScreen;