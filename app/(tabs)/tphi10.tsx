import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import TPhi10NeuralLimnusSystem from '@/components/TPhi10NeuralLimnusSystem';

export default function TPhi10Screen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'T-Phi10 Neural Limnus System',
          headerStyle: {
            backgroundColor: '#0F0F0F',
          },
          headerTintColor: '#F3F4F6',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }} 
      />
      <TPhi10NeuralLimnusSystem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
});