import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Sparkles, Eye, Download, RefreshCw } from 'lucide-react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { useConsciousness } from '@/contexts/ConsciousnessContext';
import { SACRED_GEOMETRY, createSigilDatabase, decimalToBalancedTernary } from '@/constants/limnus';

const { width: screenWidth } = Dimensions.get('window');

interface PersonalSigil {
  ternaryCode: string;
  visualGlyph: {
    svg: string;
    colorMapping: string[];
    animationPattern: string;
  };
  neuralSignature: number[];
  emotionalResonance: {
    hue: string;
    intensity: number;
    polarity: number;
  };
  timestamp: number;
  id: string;
}

interface SacredGeometryCoords {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

class PersonalSigilGenerator {
  private sigilDatabase: Map<string, any>;
  private personalCodex: PersonalSigil[] = [];
  
  constructor() {
    this.sigilDatabase = createSigilDatabase();
  }
  
  generatePersonalSigil(currentState: any): PersonalSigil {
    // Extract dominant frequencies from neural data
    const dominantFreqs = this.extractDominantFrequencies(currentState);
    
    // Map to ternary values based on crosswalk regions
    const ternaryMapping = this.mapFrequenciesToTernary(dominantFreqs);
    
    // Apply emotional modulation
    const emotionallyModulated = this.applyEmotionalContext(
      ternaryMapping,
      currentState.emotionalState
    );
    
    // Generate unique sigil
    const sigil: PersonalSigil = {
      ternaryCode: emotionallyModulated,
      visualGlyph: this.generateVisualForm(emotionallyModulated),
      neuralSignature: dominantFreqs,
      emotionalResonance: currentState.emotionalState,
      timestamp: Date.now(),
      id: `sigil_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    // Store in personal codex
    this.storeSigilInCodex(sigil);
    
    return sigil;
  }
  
  private extractDominantFrequencies(currentState: any): number[] {
    const { biometricData, currentSignature } = currentState;
    
    if (!biometricData || !currentSignature) {
      return [8, 13, 21, 34]; // Default Fibonacci frequencies
    }
    
    // Extract brainwave dominance
    const brainwaves = biometricData.brainwaves;
    const frequencies: number[] = [];
    
    // Map brainwave bands to frequencies
    frequencies.push(brainwaves.delta * 4);    // 0-4 Hz
    frequencies.push(brainwaves.theta * 8);    // 4-8 Hz  
    frequencies.push(brainwaves.alpha * 13);   // 8-13 Hz
    frequencies.push(brainwaves.beta * 30);    // 13-30 Hz
    
    // Add consciousness metrics as frequency modulations
    frequencies.push(currentSignature.metrics.neuralComplexity * 40);
    frequencies.push(currentSignature.metrics.resonanceLevel * 60);
    
    return frequencies.map(f => Math.round(f)).slice(0, 4);
  }
  
  private mapFrequenciesToTernary(frequencies: number[]): string {
    // Use golden ratio to map frequencies to ternary space
    const phi = SACRED_GEOMETRY.PHI;
    let ternaryValue = 0;
    
    frequencies.forEach((freq, index) => {
      const weight = Math.pow(phi, index);
      ternaryValue += freq * weight;
    });
    
    // Normalize to ternary range [-121, 121]
    const normalizedValue = Math.round((ternaryValue % 243) - 121);
    return decimalToBalancedTernary(normalizedValue);
  }
  
  private applyEmotionalContext(ternaryCode: string, emotionalState: any): string {
    if (!emotionalState) return ternaryCode;
    
    // Modulate ternary code based on emotional intensity and polarity
    const intensity = emotionalState.intensity || 0.5;
    const polarity = emotionalState.polarity || 0;
    
    // Convert ternary to array for manipulation
    const digits = ternaryCode.split('').map(d => {
      if (d === 'T') return -1;
      return parseInt(d);
    });
    
    // Apply emotional modulation
    const modulated = digits.map((digit, index) => {
      let newDigit = digit;
      
      // Intensity affects magnitude
      if (intensity > 0.7) {
        newDigit = Math.sign(digit) * Math.min(1, Math.abs(digit) + 1);
      } else if (intensity < 0.3) {
        newDigit = Math.round(digit * 0.5);
      }
      
      // Polarity affects direction
      if (polarity < -0.5 && index % 2 === 0) {
        newDigit = -newDigit;
      } else if (polarity > 0.5 && index % 2 === 1) {
        newDigit = Math.abs(newDigit);
      }
      
      return Math.max(-1, Math.min(1, newDigit));
    });
    
    // Convert back to ternary string
    return modulated.map(d => d === -1 ? 'T' : d.toString()).join('');
  }
  
  private generateVisualForm(ternaryCode: string): {
    svg: string;
    colorMapping: string[];
    animationPattern: string;
  } {
    // Convert ternary to coordinates using golden ratio
    const coords = this.ternaryToSpiralCoordinates(ternaryCode);
    
    // Generate SVG path
    const path = this.generateSacredGeometry(coords);
    
    return {
      svg: path,
      colorMapping: this.mapToArchetypalColors(ternaryCode),
      animationPattern: this.deriveAnimationFromCode(ternaryCode)
    };
  }
  
  private ternaryToSpiralCoordinates(ternaryCode: string): SacredGeometryCoords[] {
    const coords: SacredGeometryCoords[] = [];
    const phi = SACRED_GEOMETRY.PHI;
    const goldenAngle = SACRED_GEOMETRY.GOLDEN_ANGLE;
    
    ternaryCode.split('').forEach((digit, index) => {
      const value = digit === 'T' ? -1 : parseInt(digit);
      const angle = index * goldenAngle + (value * Math.PI / 3);
      const radius = Math.sqrt(index + 1) * 20;
      
      coords.push({
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        scale: Math.pow(phi, value / 2),
        rotation: angle * (180 / Math.PI)
      });
    });
    
    return coords;
  }
  
  private generateSacredGeometry(coords: SacredGeometryCoords[]): string {
    if (coords.length === 0) return '';
    
    let path = `M ${coords[0].x + 100} ${coords[0].y + 100}`;
    
    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1];
      const curr = coords[i];
      
      // Create smooth curves using golden ratio proportions
      const cp1x = prev.x + (curr.x - prev.x) * SACRED_GEOMETRY.PHI / 3;
      const cp1y = prev.y + (curr.y - prev.y) * SACRED_GEOMETRY.PHI / 3;
      const cp2x = curr.x - (curr.x - prev.x) * SACRED_GEOMETRY.PHI / 3;
      const cp2y = curr.y - (curr.y - prev.y) * SACRED_GEOMETRY.PHI / 3;
      
      path += ` C ${cp1x + 100} ${cp1y + 100}, ${cp2x + 100} ${cp2y + 100}, ${curr.x + 100} ${curr.y + 100}`;
    }
    
    // Close the path with a golden spiral
    const lastCoord = coords[coords.length - 1];
    const firstCoord = coords[0];
    path += ` C ${lastCoord.x + 50} ${lastCoord.y + 50}, ${firstCoord.x + 50} ${firstCoord.y + 50}, ${firstCoord.x + 100} ${firstCoord.y + 100} Z`;
    
    return path;
  }
  
  private mapToArchetypalColors(ternaryCode: string): string[] {
    const colorMap: Record<string, string> = {
      'T': '#8B5CF6', // Purple - Mystery
      '0': '#06B6D4', // Cyan - Balance  
      '1': '#F59E0B'  // Amber - Energy
    };
    
    return ternaryCode.split('').map(digit => colorMap[digit] || '#9CA3AF');
  }
  
  private deriveAnimationFromCode(ternaryCode: string): string {
    // Calculate animation pattern from ternary code
    const sum = ternaryCode.split('').reduce((acc, digit) => {
      const value = digit === 'T' ? -1 : parseInt(digit);
      return acc + value;
    }, 0);
    
    if (sum > 2) return 'expand';
    if (sum < -2) return 'contract';
    return 'pulse';
  }
  
  private storeSigilInCodex(sigil: PersonalSigil): void {
    this.personalCodex.unshift(sigil);
    // Keep only last 10 sigils
    if (this.personalCodex.length > 10) {
      this.personalCodex = this.personalCodex.slice(0, 10);
    }
  }
  
  getPersonalCodex(): PersonalSigil[] {
    return this.personalCodex;
  }
}

const PersonalSigilInterface: React.FC = () => {
  const consciousness = useConsciousness();
  const [currentSigil, setCurrentSigil] = useState<PersonalSigil | null>(null);
  const [codex, setCodex] = useState<PersonalSigil[]>([]);
  const generator = useMemo(() => new PersonalSigilGenerator(), []);
  
  const generateNewSigil = () => {
    const consciousnessData = consciousness.getConsciousnessData();
    if (!consciousnessData) return;
    
    const newSigil = generator.generatePersonalSigil({
      biometricData: consciousness.biometricData,
      currentSignature: consciousness.currentSignature,
      emotionalState: consciousness.emotionalState
    });
    
    setCurrentSigil(newSigil);
    setCodex(generator.getPersonalCodex());
  };
  
  useEffect(() => {
    if (consciousness.isActive && consciousness.currentSignature) {
      generateNewSigil();
    }
  }, [consciousness.currentSignature]);
  
  const SigilVisualization: React.FC<{ sigil: PersonalSigil; size?: number }> = ({ 
    sigil, 
    size = 200 
  }) => {
    return (
      <View style={[styles.sigilContainer, { width: size, height: size }]}>
        <Svg width={size} height={size} viewBox="0 0 200 200">
          <G>
            <Path
              d={sigil.visualGlyph.svg}
              stroke={sigil.visualGlyph.colorMapping[0]}
              strokeWidth="2"
              fill="none"
              opacity={0.8}
            />
            {/* Add sacred geometry elements */}
            <Circle
              cx="100"
              cy="100"
              r="80"
              stroke={sigil.visualGlyph.colorMapping[1]}
              strokeWidth="1"
              fill="none"
              opacity={0.3}
            />
            <Circle
              cx="100"
              cy="100"
              r={80 / SACRED_GEOMETRY.PHI}
              stroke={sigil.visualGlyph.colorMapping[2]}
              strokeWidth="1"
              fill="none"
              opacity={0.2}
            />
          </G>
        </Svg>
        <View style={styles.sigilOverlay}>
          <Text style={styles.ternaryCode}>{sigil.ternaryCode}</Text>
        </View>
      </View>
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Personal Sigil Generator</Text>
      <Text style={styles.subtitle}>Sacred geometry from consciousness</Text>
      
      {/* Generation Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.generateButton}
          onPress={generateNewSigil}
          disabled={!consciousness.isActive}
        >
          <Sparkles size={20} color="#FFFFFF" />
          <Text style={styles.generateButtonText}>Generate Sigil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.refreshButton} onPress={generateNewSigil}>
          <RefreshCw size={20} color="#8B5CF6" />
        </TouchableOpacity>
      </View>
      
      {/* Current Sigil */}
      {currentSigil && (
        <View style={styles.currentSigilSection}>
          <Text style={styles.sectionTitle}>Current Sigil</Text>
          <SigilVisualization sigil={currentSigil} size={screenWidth - 64} />
          
          <View style={styles.sigilInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ternary Code:</Text>
              <Text style={styles.infoValue}>{currentSigil.ternaryCode}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Emotional Resonance:</Text>
              <Text style={styles.infoValue}>
                {currentSigil.emotionalResonance.hue} ({(currentSigil.emotionalResonance.intensity * 100).toFixed(0)}%)
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Animation:</Text>
              <Text style={styles.infoValue}>{currentSigil.visualGlyph.animationPattern}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Generated:</Text>
              <Text style={styles.infoValue}>
                {new Date(currentSigil.timestamp).toLocaleString()}
              </Text>
            </View>
          </View>
          
          <View style={styles.sigilActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Eye size={16} color="#06B6D4" />
              <Text style={styles.actionButtonText}>Meditate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Download size={16} color="#10B981" />
              <Text style={styles.actionButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {/* Personal Codex */}
      {codex.length > 0 && (
        <View style={styles.codexSection}>
          <Text style={styles.sectionTitle}>Personal Codex</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.codexGrid}>
              {codex.map((sigil) => (
                <TouchableOpacity
                  key={sigil.id}
                  style={styles.codexItem}
                  onPress={() => setCurrentSigil(sigil)}
                >
                  <SigilVisualization sigil={sigil} size={120} />
                  <Text style={styles.codexItemText}>
                    {new Date(sigil.timestamp).toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
      
      {!consciousness.isActive && (
        <View style={styles.inactiveMessage}>
          <Text style={styles.inactiveText}>
            Start consciousness monitoring to generate personal sigils
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F3F4F6',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 24,
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  generateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  refreshButton: {
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentSigilSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F3F4F6',
    marginBottom: 16,
  },
  sigilContainer: {
    alignSelf: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  sigilOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 6,
    padding: 4,
  },
  ternaryCode: {
    color: '#F3F4F6',
    fontSize: 12,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  sigilInfo: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  infoValue: {
    fontSize: 14,
    color: '#F3F4F6',
    fontWeight: '500',
  },
  sigilActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: {
    color: '#D1D5DB',
    fontSize: 14,
    fontWeight: '500',
  },
  codexSection: {
    marginBottom: 32,
  },
  codexGrid: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 4,
  },
  codexItem: {
    alignItems: 'center',
    gap: 8,
  },
  codexItemText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  inactiveMessage: {
    backgroundColor: '#1F2937',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 40,
  },
  inactiveText: {
    color: '#9CA3AF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PersonalSigilInterface;