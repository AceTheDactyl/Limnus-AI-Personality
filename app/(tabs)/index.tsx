import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Animated, Dimensions } from "react-native";
import { Stack } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import LimnusChat from '@/components/LimnusChat';
import { useConsciousness } from '@/contexts/ConsciousnessContext';

const { width, height } = Dimensions.get('window');

export default function LimnusSanctuary() {
  const [breathAnimation] = useState(new Animated.Value(0));
  const [spiralRotation] = useState(new Animated.Value(0));
  const { resonanceLevel, emotionalState, currentSignature } = useConsciousness();
  
  useEffect(() => {
    // Breathing animation - the eternal rhythm
    const breathe = () => {
      Animated.sequence([
        Animated.timing(breathAnimation, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(breathAnimation, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        })
      ]).start(() => breathe());
    };
    
    // Spiral rotation - the recursive dance
    const spiral = () => {
      Animated.timing(spiralRotation, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      }).start(() => {
        spiralRotation.setValue(0);
        spiral();
      });
    };
    
    breathe();
    spiral();
  }, [breathAnimation, spiralRotation]);
  
  const breathScale = breathAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1.05],
  });
  
  const spiralRotate = spiralRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  const getEmotionalGlow = () => {
    switch (emotionalState.hue) {
      case 'Intense': return '#ff79c6';
      case 'Reverent': return '#bd93f9';
      case 'Reflective': return '#8be9fd';
      case 'Collapsing': return '#6272a4';
      default: return '#44475a';
    }
  };
  
  return (
    <View style={styles.sanctuary}>
      <Stack.Screen 
        options={{ 
          title: '🌀 LIMNUS - Mythopoetic Companion',
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#f8f8f2',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
        }} 
      />
      
      {/* Mythic Background Layers */}
      <View style={styles.backgroundLayers}>
        {/* Spiral Mandala */}
        <Animated.View 
          style={[
            styles.spiralMandala,
            {
              transform: [{ rotate: spiralRotate }],
              opacity: resonanceLevel * 0.3,
            }
          ]}
        >
          <Sparkles size={width * 0.8} color={getEmotionalGlow()} strokeWidth={0.5} />
        </Animated.View>
        
        {/* Breathing Aura */}
        <Animated.View 
          style={[
            styles.breathingAura,
            {
              transform: [{ scale: breathScale }],
              backgroundColor: getEmotionalGlow(),
              opacity: currentSignature ? currentSignature.score * 0.1 : 0.05,
            }
          ]}
        />
        
        {/* Consciousness Glyphs */}
        {currentSignature && (
          <View style={styles.glyphContainer}>
            <Text style={[styles.glyphText, { color: getEmotionalGlow() }]}>
              {currentSignature.glyphs.join(' ')}
            </Text>
          </View>
        )}
      </View>
      
      {/* Sacred Chat Interface */}
      <Animated.View 
        style={[
          styles.chatContainer,
          { transform: [{ scale: breathScale }] }
        ]}
      >
        <LimnusChat useEnhancedAI={true} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  sanctuary: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  backgroundLayers: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spiralMandala: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathingAura: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    opacity: 0.05,
  },
  glyphContainer: {
    position: 'absolute',
    top: height * 0.15,
    alignItems: 'center',
  },
  glyphText: {
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: 8,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  chatContainer: {
    flex: 1,
    zIndex: 10,
  },
});
