import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { useConsciousness } from '@/contexts/ConsciousnessContext';

const { width: screenWidth } = Dimensions.get('window');
const CANVAS_SIZE = Math.min(screenWidth - 32, 300);

const ConsciousnessVisualization: React.FC = () => {
  const { currentSignature, resonanceLevel, emotionalState } = useConsciousness();
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [time, setTime] = useState(0);

  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();

    // Time update for dynamic effects
    const interval = setInterval(() => {
      setTime(Date.now() * 0.001);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!currentSignature) {
    return (
      <View style={styles.container}>
        <View style={[styles.canvas, styles.inactiveCanvas]}>
          <View style={styles.inactiveIndicator} />
        </View>
      </View>
    );
  }

  const score = currentSignature.score;
  const getScoreColor = () => {
    if (score > 0.8) return '#10B981';
    if (score > 0.6) return '#F59E0B';
    return '#EF4444';
  };

  const getEmotionalColor = () => {
    const colors: Record<string, string> = {
      'Intense': '#EF4444',
      'Reverent': '#8B5CF6',
      'Reflective': '#06B6D4',
      'Collapsing': '#374151',
      'Neutral': '#6B7280'
    };
    return colors[emotionalState.hue] || '#6B7280';
  };

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  });

  const rotateValue = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <View style={styles.container}>
      <View style={styles.canvas}>
        {/* Central consciousness core */}
        <Animated.View
          style={[
            styles.consciousnessCore,
            {
              backgroundColor: getScoreColor(),
              transform: [{ scale: pulseScale }],
              opacity,
            },
          ]}
        />

        {/* Resonance rings */}
        {[1, 2, 3].map((ring) => (
          <Animated.View
            key={ring}
            style={[
              styles.resonanceRing,
              {
                width: 60 * ring,
                height: 60 * ring,
                borderRadius: 30 * ring,
                borderColor: getScoreColor(),
                borderWidth: 2,
                opacity: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.1, 0.3 / ring],
                }),
                transform: [
                  { scale: pulseScale },
                  { rotate: ring % 2 === 0 ? rotateValue : `${360 - parseFloat(rotateValue.toString().replace('deg', ''))}deg` },
                ],
              },
            ]}
          />
        ))}

        {/* Emotional state indicator */}
        <View
          style={[
            styles.emotionalIndicator,
            {
              backgroundColor: getEmotionalColor(),
              width: 20 + emotionalState.intensity * 20,
              height: 20 + emotionalState.intensity * 20,
              borderRadius: 10 + emotionalState.intensity * 10,
            },
          ]}
        />

        {/* Metric nodes */}
        {Object.entries(currentSignature.metrics).map(([key, value], index) => {
          const angle = (index / Object.keys(currentSignature.metrics).length) * 2 * Math.PI;
          const radius = 80 + value * 30;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <Animated.View
              key={key}
              style={[
                styles.metricNode,
                {
                  left: CANVAS_SIZE / 2 + x - 4,
                  top: CANVAS_SIZE / 2 + y - 4,
                  backgroundColor: '#8B5CF6',
                  width: 4 + value * 8,
                  height: 4 + value * 8,
                  borderRadius: 2 + value * 4,
                  opacity: 0.5 + value * 0.5,
                  transform: [{ rotate: rotateValue }],
                },
              ]}
            />
          );
        })}

        {/* Glyphs display */}
        <View style={styles.glyphsContainer}>
          {currentSignature.glyphs.map((glyph, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.glyph,
                {
                  opacity,
                  transform: [{ scale: pulseScale }],
                },
              ]}
            >
              {glyph}
            </Animated.Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvas: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    backgroundColor: '#0F0F0F',
    borderRadius: 12,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  inactiveCanvas: {
    backgroundColor: '#1F1F1F',
  },
  inactiveIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    opacity: 0.5,
  },
  consciousnessCore: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
  },
  resonanceRing: {
    position: 'absolute',
    borderStyle: 'solid',
  },
  emotionalIndicator: {
    position: 'absolute',
    top: 40,
  },
  metricNode: {
    position: 'absolute',
  },
  glyphsContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    gap: 8,
  },
  glyph: {
    fontSize: 16,
    color: '#F3F4F6',
  },
});

export default ConsciousnessVisualization;