import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import ConsciousnessDashboard from '@/components/ConsciousnessDashboard';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Consciousness Monitor',
          headerStyle: {
            backgroundColor: '#0F0F0F',
          },
          headerTintColor: '#F3F4F6',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }} 
      />
      <ConsciousnessDashboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
});