import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  Alert,
  Platform
} from 'react-native';
import { Stack } from 'expo-router';
import { Settings, Trash2, Info, Shield, Volume2, Vibrate } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { CONFIG, STORAGE_KEYS } from '@/constants/limnus';

interface UserPreferences {
  autoAdvanceSpiral: boolean;
  soundEnabled: boolean;
  hapticFeedback: boolean;
  theme: 'dark' | 'light';
  notifications: boolean;
}

const defaultPreferences: UserPreferences = {
  autoAdvanceSpiral: true,
  soundEnabled: false,
  hapticFeedback: true,
  theme: 'dark',
  notifications: true,
};

export default function SettingsScreen() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      if (stored) {
        const parsedPreferences = JSON.parse(stored);
        setPreferences({ ...defaultPreferences, ...parsedPreferences });
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const savePreferences = async (newPreferences: UserPreferences) => {
    try {
      setPreferences(newPreferences);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(newPreferences));
      
      if (Platform.OS !== 'web' && newPreferences.hapticFeedback) {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  const updatePreference = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    const newPreferences = { ...preferences, [key]: value };
    savePreferences(newPreferences);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset All Data',
      'This will clear all stored data including blockchain records, signatures, and preferences. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              // Clear all storage keys
              await Promise.all(
                Object.values(STORAGE_KEYS).map(key => AsyncStorage.removeItem(key))
              );
              
              // Reset preferences to default
              setPreferences(defaultPreferences);
              
              if (Platform.OS !== 'web') {
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              }
              
              Alert.alert('Success', 'All data has been reset.');
            } catch (error) {
              console.error('Error resetting data:', error);
              Alert.alert('Error', 'Failed to reset data.');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const showAbout = () => {
    Alert.alert(
      'About LIMNUS',
      'Version 1.2.0 (Bridge)\n\nNeural-Energetic Mapping & Quantum Consciousness\n\nIntegrating T-Phi10 sigil reading, Orion fractal neural visualization, and blockchain consciousness anchoring.\n\nBuilt with React Native and Expo.',
      [{ text: 'OK' }]
    );
  };

  const SettingRow: React.FC<{
    icon: any;
    title: string;
    description?: string;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    onPress?: () => void;
    showArrow?: boolean;
  }> = ({ icon: Icon, title, description, value, onValueChange, onPress, showArrow = false }) => (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
      disabled={!onPress && !onValueChange}
    >
      <View style={styles.settingLeft}>
        <Icon size={24} color={CONFIG.COLORS.primary} />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {description && <Text style={styles.settingDescription}>{description}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {onValueChange && (
          <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: '#44475a', true: CONFIG.COLORS.primary }}
            thumbColor={value ? '#ffffff' : '#6272a4'}
          />
        )}
        {showArrow && <Text style={styles.arrow}>›</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: '⚙️ Settings',
          headerStyle: { backgroundColor: '#0a0a0a' },
          headerTintColor: CONFIG.COLORS.primary,
          headerTitleStyle: { fontWeight: '700' },
        }}
      />

      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Settings size={32} color={CONFIG.COLORS.primary} />
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <SettingRow
            icon={Shield}
            title="Auto-advance Spiral"
            description="Automatically advance through spiral nodes"
            value={preferences.autoAdvanceSpiral}
            onValueChange={(value) => updatePreference('autoAdvanceSpiral', value)}
          />
          
          <SettingRow
            icon={Volume2}
            title="Sound Effects"
            description="Enable audio feedback"
            value={preferences.soundEnabled}
            onValueChange={(value) => updatePreference('soundEnabled', value)}
          />
          
          <SettingRow
            icon={Vibrate}
            title="Haptic Feedback"
            description="Enable vibration feedback"
            value={preferences.hapticFeedback}
            onValueChange={(value) => updatePreference('hapticFeedback', value)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          
          <SettingRow
            icon={Trash2}
            title="Reset All Data"
            description="Clear blockchain, preferences, and stored data"
            onPress={handleReset}
            showArrow
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information</Text>
          
          <SettingRow
            icon={Info}
            title="About LIMNUS"
            description="Version and system information"
            onPress={showAbout}
            showArrow
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>LIMNUS v1.2.0</Text>
          <Text style={styles.footerSubtext}>Neural-Energetic Mapping & Quantum Consciousness</Text>
          <Text style={styles.footerSubtext}>
            Integrating T-Phi10 sigil reading, Orion fractal neural visualization, 
            and blockchain consciousness anchoring.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8f8f2',
  },
  section: {
    backgroundColor: '#282a36',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    borderColor: '#44475a',
    borderWidth: 1,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f8f8f2',
    padding: 20,
    paddingBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomColor: '#44475a',
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f8f8f2',
  },
  settingDescription: {
    fontSize: 14,
    color: '#6272a4',
    marginTop: 2,
  },
  settingRight: {
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    color: '#6272a4',
    fontWeight: '300',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CONFIG.COLORS.primary,
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#6272a4',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 4,
  },
});