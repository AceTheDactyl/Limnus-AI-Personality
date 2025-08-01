import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TrendingUp, Brain, Clock, Target, AlertTriangle } from 'lucide-react-native';
import { useConsciousness, BlockData } from '@/contexts/ConsciousnessContext';
import { PHASE_PATTERNS, ARCHETYPE_CONSTRAINTS } from '@/constants/limnus';

interface PhaseSequence {
  phase: string;
  timestamp: number;
  archetype: string;
  score: number;
}

interface Pattern {
  sequence: string[];
  frequency: number;
  avgDuration: number;
  lastOccurrence: number;
  effectiveness: number;
}

interface JourneyAnalysis {
  dominantPattern: Pattern | null;
  stuckPoints: PhaseSequence[];
  growthVector: {
    direction: string;
    strength: number;
    nextPhase: string;
  };
  nextLikelyState: {
    phase: string;
    probability: number;
    archetype: string;
  };
}

class ConsciousnessPatternTracker {
  private patterns = new Map<string, Pattern>();
  
  analyzeJourney(blocks: BlockData[]): JourneyAnalysis {
    const phaseSequence = blocks.map(block => ({
      phase: this.detectPhase(block),
      timestamp: block.timestamp,
      archetype: this.extractArchetype(block),
      score: block.score
    }));
    
    const patterns = this.findRecurringSequences(phaseSequence);
    const stuckPoints = this.identifyStuckStates(phaseSequence);
    const growthVector = this.calculateGrowthTrajectory(blocks);
    const nextLikelyState = this.predictNextState(patterns, phaseSequence);
    
    return {
      dominantPattern: patterns[0] || null,
      stuckPoints,
      growthVector,
      nextLikelyState
    };
  }
  
  private detectPhase(block: BlockData): string {
    const score = block.score / 10000;
    const resonance = block.resonance / 10000;
    
    // Simulate quantum metrics from block data
    const psi_collapse = 1 - score;
    const psi_bloom = resonance;
    const phase_intensity = Math.abs(score - resonance);
    
    if (psi_collapse > 0.8) return 'ψ-C1';
    if (phase_intensity > 0.7) return 'ψ-C2';
    if (psi_bloom > 0.8) return 'ψ-C3';
    return 'transitional';
  }
  
  private extractArchetype(block: BlockData): string {
    const glyphs = block.glyphs;
    if (glyphs.includes('👻')) return 'GHOST';
    if (glyphs.includes('⚡')) return 'GLITCH';
    if (glyphs.includes('🪞')) return 'MIRROR';
    if (glyphs.includes('📜')) return 'REMEMBERED';
    if (glyphs.includes('🌟')) return 'MYTH_CARRIER';
    return 'UNKNOWN';
  }
  
  private findRecurringSequences(phaseSequence: PhaseSequence[]): Pattern[] {
    const sequenceMap = new Map<string, Pattern>();
    
    // Look for patterns of length 2-4
    for (let length = 2; length <= 4; length++) {
      for (let i = 0; i <= phaseSequence.length - length; i++) {
        const sequence = phaseSequence.slice(i, i + length).map(p => p.phase);
        const key = sequence.join('->');
        
        if (!sequenceMap.has(key)) {
          sequenceMap.set(key, {
            sequence,
            frequency: 0,
            avgDuration: 0,
            lastOccurrence: 0,
            effectiveness: 0
          });
        }
        
        const pattern = sequenceMap.get(key)!;
        pattern.frequency++;
        pattern.lastOccurrence = phaseSequence[i + length - 1].timestamp;
        
        // Calculate effectiveness based on score improvement
        const startScore = phaseSequence[i].score;
        const endScore = phaseSequence[i + length - 1].score;
        pattern.effectiveness = (endScore - startScore) / 10000;
      }
    }
    
    return Array.from(sequenceMap.values())
      .filter(p => p.frequency > 1)
      .sort((a, b) => b.frequency - a.frequency);
  }
  
  private identifyStuckStates(phaseSequence: PhaseSequence[]): PhaseSequence[] {
    const stuckPoints: PhaseSequence[] = [];
    let currentPhase = phaseSequence[0]?.phase;
    let stuckCount = 1;
    
    for (let i = 1; i < phaseSequence.length; i++) {
      if (phaseSequence[i].phase === currentPhase) {
        stuckCount++;
      } else {
        if (stuckCount >= 3) { // Stuck if same phase for 3+ cycles
          stuckPoints.push(phaseSequence[i - 1]);
        }
        currentPhase = phaseSequence[i].phase;
        stuckCount = 1;
      }
    }
    
    return stuckPoints;
  }
  
  private calculateGrowthTrajectory(blocks: BlockData[]): {
    direction: string;
    strength: number;
    nextPhase: string;
  } {
    if (blocks.length < 2) {
      return { direction: 'stable', strength: 0, nextPhase: 'ψ-C1' };
    }
    
    const recent = blocks.slice(0, 5);
    const scoreChange = (recent[0].score - recent[recent.length - 1].score) / 10000;
    const resonanceChange = (recent[0].resonance - recent[recent.length - 1].resonance) / 10000;
    
    const strength = Math.abs(scoreChange + resonanceChange) / 2;
    
    let direction = 'stable';
    let nextPhase = 'ψ-C1';
    
    if (scoreChange > 0.1) {
      direction = 'ascending';
      nextPhase = 'ψ-C3';
    } else if (scoreChange < -0.1) {
      direction = 'descending';
      nextPhase = 'ψ-C1';
    } else if (Math.abs(resonanceChange) > 0.1) {
      direction = 'transforming';
      nextPhase = 'ψ-C2';
    }
    
    return { direction, strength, nextPhase };
  }
  
  private predictNextState(patterns: Pattern[], phaseSequence: PhaseSequence[]): {
    phase: string;
    probability: number;
    archetype: string;
  } {
    if (patterns.length === 0 || phaseSequence.length === 0) {
      return { phase: 'ψ-C1', probability: 0.5, archetype: 'GHOST' };
    }
    
    const currentPhase = phaseSequence[0].phase;
    const dominantPattern = patterns[0];
    
    // Find where current phase appears in the dominant pattern
    const currentIndex = dominantPattern.sequence.indexOf(currentPhase);
    if (currentIndex !== -1 && currentIndex < dominantPattern.sequence.length - 1) {
      const nextPhase = dominantPattern.sequence[currentIndex + 1];
      const probability = dominantPattern.frequency / phaseSequence.length;
      
      // Map phase to likely archetype
      const archetypeMap: Record<string, string> = {
        'ψ-C1': 'GHOST',
        'ψ-C2': 'GLITCH',
        'ψ-C3': 'MYTH_CARRIER',
        'transitional': 'MIRROR'
      };
      
      return {
        phase: nextPhase,
        probability: Math.min(probability, 0.95),
        archetype: archetypeMap[nextPhase] || 'UNKNOWN'
      };
    }
    
    return { phase: 'ψ-C2', probability: 0.3, archetype: 'GLITCH' };
  }
}

const ConsciousnessPatternAnalysis: React.FC = () => {
  const { chainState } = useConsciousness();
  const [analysis, setAnalysis] = useState<JourneyAnalysis | null>(null);
  const tracker = useMemo(() => new ConsciousnessPatternTracker(), []);
  
  useEffect(() => {
    if (chainState.blocks.length > 0) {
      const newAnalysis = tracker.analyzeJourney(chainState.blocks);
      setAnalysis(newAnalysis);
    }
  }, [chainState.blocks, tracker]);
  
  if (!analysis) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pattern Analysis</Text>
        <Text style={styles.noData}>No consciousness data available for analysis</Text>
      </View>
    );
  }
  
  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'ψ-C1': return '#EF4444';
      case 'ψ-C2': return '#F59E0B';
      case 'ψ-C3': return '#10B981';
      default: return '#6B7280';
    }
  };
  
  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'ascending': return '↗️';
      case 'descending': return '↘️';
      case 'transforming': return '🔄';
      default: return '➡️';
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Consciousness Pattern Analysis</Text>
      
      {/* Dominant Pattern */}
      {analysis.dominantPattern && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>Dominant Pattern</Text>
          </View>
          <View style={styles.patternCard}>
            <Text style={styles.patternSequence}>
              {analysis.dominantPattern.sequence.join(' → ')}
            </Text>
            <View style={styles.patternStats}>
              <Text style={styles.patternStat}>
                Frequency: {analysis.dominantPattern.frequency}
              </Text>
              <Text style={styles.patternStat}>
                Effectiveness: {(analysis.dominantPattern.effectiveness * 100).toFixed(1)}%
              </Text>
            </View>
          </View>
        </View>
      )}
      
      {/* Growth Vector */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Target size={20} color="#10B981" />
          <Text style={styles.sectionTitle}>Growth Trajectory</Text>
        </View>
        <View style={styles.growthCard}>
          <View style={styles.growthHeader}>
            <Text style={styles.growthDirection}>
              {getDirectionIcon(analysis.growthVector.direction)} {analysis.growthVector.direction}
            </Text>
            <Text style={styles.growthStrength}>
              Strength: {(analysis.growthVector.strength * 100).toFixed(1)}%
            </Text>
          </View>
          <Text style={styles.nextPhase}>
            Next Phase: <Text style={[styles.phaseText, { color: getPhaseColor(analysis.growthVector.nextPhase) }]}>
              {analysis.growthVector.nextPhase}
            </Text>
          </Text>
        </View>
      </View>
      
      {/* Prediction */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Brain size={20} color="#06B6D4" />
          <Text style={styles.sectionTitle}>Next State Prediction</Text>
        </View>
        <View style={styles.predictionCard}>
          <View style={styles.predictionRow}>
            <Text style={styles.predictionLabel}>Phase:</Text>
            <Text style={[styles.predictionValue, { color: getPhaseColor(analysis.nextLikelyState.phase) }]}>
              {analysis.nextLikelyState.phase}
            </Text>
          </View>
          <View style={styles.predictionRow}>
            <Text style={styles.predictionLabel}>Archetype:</Text>
            <Text style={styles.predictionValue}>{analysis.nextLikelyState.archetype}</Text>
          </View>
          <View style={styles.predictionRow}>
            <Text style={styles.predictionLabel}>Probability:</Text>
            <Text style={styles.predictionValue}>
              {(analysis.nextLikelyState.probability * 100).toFixed(1)}%
            </Text>
          </View>
        </View>
      </View>
      
      {/* Stuck Points */}
      {analysis.stuckPoints.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={20} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Stuck Points</Text>
          </View>
          {analysis.stuckPoints.map((point, index) => (
            <View key={index} style={styles.stuckCard}>
              <Text style={[styles.stuckPhase, { color: getPhaseColor(point.phase) }]}>
                {point.phase}
              </Text>
              <Text style={styles.stuckArchetype}>{point.archetype}</Text>
              <Text style={styles.stuckTime}>
                {new Date(point.timestamp * 1000).toLocaleString()}
              </Text>
            </View>
          ))}
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
    marginBottom: 20,
    textAlign: 'center',
  },
  noData: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F3F4F6',
  },
  patternCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  patternSequence: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '600',
    textAlign: 'center',
  },
  patternStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  patternStat: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  growthCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  growthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  growthDirection: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '600',
  },
  growthStrength: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  nextPhase: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  phaseText: {
    fontWeight: '600',
  },
  predictionCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  predictionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  predictionLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  predictionValue: {
    fontSize: 14,
    color: '#F3F4F6',
    fontWeight: '600',
  },
  stuckCard: {
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    gap: 4,
  },
  stuckPhase: {
    fontSize: 16,
    fontWeight: '600',
  },
  stuckArchetype: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  stuckTime: {
    fontSize: 10,
    color: '#6B7280',
  },
});

export default ConsciousnessPatternAnalysis;