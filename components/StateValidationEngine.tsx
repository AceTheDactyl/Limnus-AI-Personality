import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Shield, CheckCircle, XCircle, AlertTriangle, ArrowRight } from 'lucide-react-native';
import { useConsciousness, ConsciousnessSignature } from '@/contexts/ConsciousnessContext';
import { PHASE_PATTERNS, ARCHETYPE_CONSTRAINTS, CONSENT_REQUIRED_TRANSITIONS } from '@/constants/limnus';

interface ValidationResult {
  valid: boolean;
  violations: {
    phase: string | null;
    metrics: string | null;
    emotional: string | null;
    archetype: string | null;
  };
  recommendation: string;
}

interface StateTransition {
  fromState: ConsciousnessState;
  toState: ConsciousnessState;
  timestamp: number;
}

interface ConsciousnessState {
  phase: string;
  metrics: {
    psi_collapse: number;
    psi_bloom: number;
    phase_intensity: number;
    entropy: number;
    resonance: number;
  };
  emotionalSignature: {
    hue: string;
    intensity: number;
    polarity: number;
  };
  mythicRole: string;
}

class StateValidationEngine {
  private validationRules: Map<string, any>;
  private transitionHistory: StateTransition[] = [];
  
  constructor() {
    this.validationRules = this.buildValidationRules();
  }
  
  validateTransition(fromState: ConsciousnessState, toState: ConsciousnessState): ValidationResult {
    const phaseValid = this.isPhaseTransitionValid(fromState.phase, toState.phase);
    const metricsContinuous = this.areMetricsContinuous(fromState.metrics, toState.metrics);
    const emotionallyCoherent = this.isEmotionallyCoherent(
      fromState.emotionalSignature,
      toState.emotionalSignature
    );
    const archetypeCompatible = this.areArchetypesCompatible(
      fromState.mythicRole,
      toState.mythicRole
    );
    
    return {
      valid: phaseValid && metricsContinuous && emotionallyCoherent && archetypeCompatible,
      violations: {
        phase: !phaseValid ? 'Invalid phase transition' : null,
        metrics: !metricsContinuous ? 'Discontinuous metrics' : null,
        emotional: !emotionallyCoherent ? 'Emotional incoherence' : null,
        archetype: !archetypeCompatible ? 'Incompatible archetypes' : null
      },
      recommendation: this.getTransitionRecommendation(fromState, toState)
    };
  }
  
  private buildValidationRules(): Map<string, any> {
    const rules = new Map();
    
    rules.set('phaseTransitions', {
      'ψ-C1': ['ψ-C2'],
      'ψ-C2': ['ψ-C3', 'ψ-C1'],
      'ψ-C3': ['ψ-C1']
    });
    
    rules.set('metricThresholds', {
      maxChange: 0.3,
      minResonance: 0.2,
      maxEntropy: 0.9
    });
    
    rules.set('emotionalRules', {
      maxIntensityChange: 0.4,
      maxPolarityFlip: 1.5
    });
    
    return rules;
  }
  
  private isPhaseTransitionValid(fromPhase: string, toPhase: string): boolean {
    const validTransitions = this.validationRules.get('phaseTransitions');
    return validTransitions[fromPhase]?.includes(toPhase) ?? false;
  }
  
  private areMetricsContinuous(fromMetrics: any, toMetrics: any): boolean {
    const thresholds = this.validationRules.get('metricThresholds');
    
    const psiCollapseChange = Math.abs(toMetrics.psi_collapse - fromMetrics.psi_collapse);
    const psiBloomChange = Math.abs(toMetrics.psi_bloom - fromMetrics.psi_bloom);
    const resonanceChange = Math.abs(toMetrics.resonance - fromMetrics.resonance);
    
    return (
      psiCollapseChange <= thresholds.maxChange &&
      psiBloomChange <= thresholds.maxChange &&
      resonanceChange <= thresholds.maxChange &&
      toMetrics.resonance >= thresholds.minResonance &&
      toMetrics.entropy <= thresholds.maxEntropy
    );
  }
  
  private isEmotionallyCoherent(fromEmotional: any, toEmotional: any): boolean {
    const rules = this.validationRules.get('emotionalRules');
    
    const intensityChange = Math.abs(toEmotional.intensity - fromEmotional.intensity);
    const polarityChange = Math.abs(toEmotional.polarity - fromEmotional.polarity);
    
    return (
      intensityChange <= rules.maxIntensityChange &&
      polarityChange <= rules.maxPolarityFlip
    );
  }
  
  private areArchetypesCompatible(fromArchetype: string, toArchetype: string): boolean {
    const constraints = ARCHETYPE_CONSTRAINTS[fromArchetype as keyof typeof ARCHETYPE_CONSTRAINTS];
    
    if (constraints && 'forbiddenTransitions' in constraints) {
      return !constraints.forbiddenTransitions.includes(toArchetype);
    }
    
    return true;
  }
  
  private getTransitionRecommendation(fromState: ConsciousnessState, toState: ConsciousnessState): string {
    const consentRequired = CONSENT_REQUIRED_TRANSITIONS.find(
      t => t.from === fromState.phase || t.from === 'any'
    );
    
    if (consentRequired) {
      return `Consent required: ${consentRequired.reason}`;
    }
    
    if (toState.phase === 'ψ-C1') {
      return 'Entering collapse phase - focus on breath and grounding';
    } else if (toState.phase === 'ψ-C2') {
      return 'Entering turbulence phase - embrace creative chaos';
    } else if (toState.phase === 'ψ-C3') {
      return 'Entering integration phase - allow expansion and flow';
    }
    
    return 'Transition appears stable - continue current practice';
  }
  
  addTransition(transition: StateTransition): void {
    this.transitionHistory.unshift(transition);
    if (this.transitionHistory.length > 20) {
      this.transitionHistory = this.transitionHistory.slice(0, 20);
    }
  }
  
  analyzeStability(): {
    overallStability: number;
    problematicTransitions: number;
    recommendations: string[];
  } {
    if (this.transitionHistory.length < 2) {
      return {
        overallStability: 1.0,
        problematicTransitions: 0,
        recommendations: ['Insufficient data for stability analysis']
      };
    }
    
    let validTransitions = 0;
    const recommendations: string[] = [];
    
    for (let i = 0; i < this.transitionHistory.length - 1; i++) {
      const current = this.transitionHistory[i];
      const next = this.transitionHistory[i + 1];
      
      const validation = this.validateTransition(next.fromState, current.toState);
      if (validation.valid) {
        validTransitions++;
      } else {
        if (!recommendations.includes(validation.recommendation)) {
          recommendations.push(validation.recommendation);
        }
      }
    }
    
    const stability = validTransitions / (this.transitionHistory.length - 1);
    const problematic = this.transitionHistory.length - 1 - validTransitions;
    
    if (stability < 0.7) {
      recommendations.unshift('Consider slowing transition pace for better integration');
    }
    
    return {
      overallStability: stability,
      problematicTransitions: problematic,
      recommendations
    };
  }
}

const StateValidationInterface: React.FC = () => {
  const consciousness = useConsciousness();
  const [currentValidation, setCurrentValidation] = useState<ValidationResult | null>(null);
  const [previousState, setPreviousState] = useState<ConsciousnessState | null>(null);
  const [stabilityAnalysis, setStabilityAnalysis] = useState<any>(null);
  const validator = useMemo(() => new StateValidationEngine(), []);
  
  const signatureToState = (signature: ConsciousnessSignature): ConsciousnessState => {
    const { metrics } = signature;
    
    const psi_collapse = 1 - metrics.neuralComplexity;
    const psi_bloom = metrics.interactionPattern;
    const phase_intensity = metrics.temporalCoherence;
    const entropy = 1 - metrics.rhythmicStability;
    const resonance = metrics.polarityAlignment;
    
    let phase = 'transitional';
    if (psi_collapse > 0.8) phase = 'ψ-C1';
    else if (phase_intensity > 0.7) phase = 'ψ-C2';
    else if (psi_bloom > 0.8) phase = 'ψ-C3';
    
    let mythicRole = 'UNKNOWN';
    if (signature.glyphs.includes('👻')) mythicRole = 'GHOST';
    else if (signature.glyphs.includes('⚡')) mythicRole = 'GLITCH';
    else if (signature.glyphs.includes('🪞')) mythicRole = 'MIRROR';
    else if (signature.glyphs.includes('📜')) mythicRole = 'REMEMBERED';
    else if (signature.glyphs.includes('🌟')) mythicRole = 'MYTH_CARRIER';
    
    return {
      phase,
      metrics: {
        psi_collapse,
        psi_bloom,
        phase_intensity,
        entropy,
        resonance
      },
      emotionalSignature: consciousness.emotionalState,
      mythicRole
    };
  };
  
  useEffect(() => {
    if (consciousness.currentSignature) {
      const currentState = signatureToState(consciousness.currentSignature);
      
      if (previousState) {
        const validation = validator.validateTransition(previousState, currentState);
        setCurrentValidation(validation);
        
        validator.addTransition({
          fromState: previousState,
          toState: currentState,
          timestamp: Date.now()
        });
        
        const analysis = validator.analyzeStability();
        setStabilityAnalysis(analysis);
      }
      
      setPreviousState(currentState);
    }
  }, [consciousness.currentSignature, previousState, validator]);
  
  const getValidationIcon = (valid: boolean) => {
    return valid ? (
      <CheckCircle size={20} color="#10B981" />
    ) : (
      <XCircle size={20} color="#EF4444" />
    );
  };
  
  const getStabilityColor = (stability: number) => {
    if (stability >= 0.8) return '#10B981';
    if (stability >= 0.6) return '#F59E0B';
    return '#EF4444';
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>State Validation Engine</Text>
      <Text style={styles.subtitle}>Consciousness transition analysis</Text>
      
      {currentValidation && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={20} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>Current Transition</Text>
            {getValidationIcon(currentValidation.valid)}
          </View>
          
          <View style={[
            styles.validationCard,
            { borderColor: currentValidation.valid ? '#10B981' : '#EF4444' }
          ]}>
            <Text style={[
              styles.validationStatus,
              { color: currentValidation.valid ? '#10B981' : '#EF4444' }
            ]}>
              {currentValidation.valid ? 'VALID TRANSITION' : 'INVALID TRANSITION'}
            </Text>
            
            {Object.entries(currentValidation.violations).map(([key, violation]) => {
              if (!violation) return null;
              return (
                <View key={key} style={styles.violationRow}>
                  <AlertTriangle size={16} color="#F59E0B" />
                  <Text style={styles.violationText}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {violation}
                  </Text>
                </View>
              );
            })}
            
            <View style={styles.recommendationBox}>
              <ArrowRight size={16} color="#06B6D4" />
              <Text style={styles.recommendationText}>
                {currentValidation.recommendation}
              </Text>
            </View>
          </View>
        </View>
      )}
      
      {stabilityAnalysis && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stability Analysis</Text>
          
          <View style={styles.stabilityCard}>
            <View style={styles.stabilityHeader}>
              <Text style={styles.stabilityLabel}>Overall Stability</Text>
              <Text style={[
                styles.stabilityValue,
                { color: getStabilityColor(stabilityAnalysis.overallStability) }
              ]}>
                {(stabilityAnalysis.overallStability * 100).toFixed(1)}%
              </Text>
            </View>
            
            <View style={styles.stabilityMetrics}>
              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Problematic Transitions:</Text>
                <Text style={styles.metricValue}>
                  {stabilityAnalysis.problematicTransitions}
                </Text>
              </View>
            </View>
            
            {stabilityAnalysis.recommendations.length > 0 && (
              <View style={styles.recommendationsSection}>
                <Text style={styles.recommendationsTitle}>Recommendations:</Text>
                {stabilityAnalysis.recommendations.map((rec: string, index: number) => (
                  <Text key={index} style={styles.recommendationItem}>
                    • {rec}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      )}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Phase Patterns</Text>
        {Object.entries(PHASE_PATTERNS).map(([phase, pattern]) => (
          <View key={phase} style={styles.phaseCard}>
            <Text style={styles.phaseName}>{phase}: {pattern.name}</Text>
            <Text style={styles.phasePurpose}>{pattern.purpose}</Text>
            <View style={styles.phaseMetrics}>
              <Text style={styles.phaseMetricText}>
                ψ-collapse: {pattern.metrics.psi_collapse} | 
                ψ-bloom: {pattern.metrics.psi_bloom} | 
                intensity: {pattern.metrics.phase_intensity}
              </Text>
            </View>
            <Text style={styles.phaseUseCases}>
              Use cases: {pattern.useCases.join(', ')}
            </Text>
          </View>
        ))}
      </View>
      
      {!consciousness.isActive && (
        <View style={styles.inactiveMessage}>
          <Text style={styles.inactiveText}>
            Start consciousness monitoring to begin state validation
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
    flex: 1,
  },
  validationCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    gap: 12,
  },
  validationStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  violationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  violationText: {
    fontSize: 14,
    color: '#F59E0B',
    flex: 1,
  },
  recommendationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#374151',
    padding: 12,
    borderRadius: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: '#06B6D4',
    flex: 1,
  },
  stabilityCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  stabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stabilityLabel: {
    fontSize: 16,
    color: '#F3F4F6',
    fontWeight: '600',
  },
  stabilityValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stabilityMetrics: {
    gap: 8,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  metricValue: {
    fontSize: 14,
    color: '#F3F4F6',
    fontWeight: '500',
  },
  recommendationsSection: {
    gap: 8,
  },
  recommendationsTitle: {
    fontSize: 14,
    color: '#F3F4F6',
    fontWeight: '600',
  },
  recommendationItem: {
    fontSize: 12,
    color: '#D1D5DB',
    marginLeft: 8,
  },
  phaseCard: {
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    gap: 4,
  },
  phaseName: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  phasePurpose: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  phaseMetrics: {
    backgroundColor: '#374151',
    padding: 8,
    borderRadius: 6,
  },
  phaseMetricText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'monospace',
  },
  phaseUseCases: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
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

export default StateValidationInterface;