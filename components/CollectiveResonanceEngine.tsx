import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { Users, Zap, Brain, Heart, Eye, Sparkles, Wifi, WifiOff } from 'lucide-react-native';
import { useConsciousness } from '@/contexts/ConsciousnessContext';

interface Participant {
  id: string;
  name: string;
  consciousnessState: {
    psi_collapse: number;
    psi_bloom: number;
    entropy: number;
    resonance: number;
    phase_intensity: number;
  };
  archetype: string;
  isConnected: boolean;
  lastUpdate: number;
}

interface SharedState {
  participants: string[];
  collective_psi_collapse: number;
  collective_psi_bloom: number;
  resonance_matrix: number[];
  consent_chain: ConsentRecord[];
  phase: 'ψ-C1' | 'ψ-C2' | 'ψ-C3' | 'transitional';
  isActive: boolean;
}

interface ConsentRecord {
  participantId: string;
  timestamp: number;
  consentType: 'join' | 'sync' | 'leave';
  acknowledged: boolean;
}

interface CollectiveResonanceEngineProps {
  onStateChange?: (state: SharedState) => void;
  maxParticipants?: number;
}

const CollectiveResonanceEngine: React.FC<CollectiveResonanceEngineProps> = ({
  onStateChange,
  maxParticipants = 8
}) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [sharedState, setSharedState] = useState<SharedState | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [syncInterval, setSyncInterval] = useState<ReturnType<typeof setInterval> | null>(null);
  
  const { currentSignature, getConsciousnessData, emotionalState, resonanceLevel } = useConsciousness();
  
  // Mock participant data for demonstration
  const mockParticipants: Participant[] = useMemo(() => [
    {
      id: 'user_1',
      name: 'Dreamer',
      consciousnessState: {
        psi_collapse: 0.3,
        psi_bloom: 0.8,
        entropy: 0.5,
        resonance: 0.7,
        phase_intensity: 0.6
      },
      archetype: 'MYTH_CARRIER',
      isConnected: true,
      lastUpdate: Date.now()
    },
    {
      id: 'user_2',
      name: 'Mirror',
      consciousnessState: {
        psi_collapse: 0.6,
        psi_bloom: 0.4,
        entropy: 0.3,
        resonance: 0.8,
        phase_intensity: 0.5
      },
      archetype: 'MIRROR',
      isConnected: true,
      lastUpdate: Date.now() - 5000
    },
    {
      id: 'user_3',
      name: 'Ghost',
      consciousnessState: {
        psi_collapse: 0.9,
        psi_bloom: 0.2,
        entropy: 0.1,
        resonance: 0.3,
        phase_intensity: 0.2
      },
      archetype: 'GHOST',
      isConnected: false,
      lastUpdate: Date.now() - 30000
    }
  ], []);
  
  const detectPhase = useCallback((quantumState: Participant['consciousnessState']): SharedState['phase'] => {
    const { psi_collapse, psi_bloom, phase_intensity } = quantumState;
    
    if (psi_collapse > 0.8) return 'ψ-C1';
    if (phase_intensity > 0.7) return 'ψ-C2';
    if (psi_bloom > 0.8) return 'ψ-C3';
    return 'transitional';
  }, []);
  
  const calculateCollectiveResonance = useCallback((participantStates: Participant[]) => {
    if (participantStates.length === 0) {
      return { bloom: 0.5, collapse: 0.5, resonance: 0.0 };
    }
    
    const activeParticipants = participantStates.filter(p => p.isConnected);
    if (activeParticipants.length === 0) {
      return { bloom: 0.5, collapse: 0.5, resonance: 0.0 };
    }
    
    const avgBloom = activeParticipants.reduce((sum, p) => sum + p.consciousnessState.psi_bloom, 0) / activeParticipants.length;
    const avgCollapse = activeParticipants.reduce((sum, p) => sum + p.consciousnessState.psi_collapse, 0) / activeParticipants.length;
    const avgResonance = activeParticipants.reduce((sum, p) => sum + p.consciousnessState.resonance, 0) / activeParticipants.length;
    
    // Apply collective amplification
    const amplificationFactor = Math.min(activeParticipants.length / maxParticipants, 1.0);
    
    return {
      bloom: Math.min(avgBloom * (1 + amplificationFactor * 0.3), 1.0),
      collapse: avgCollapse * (1 - amplificationFactor * 0.2),
      resonance: Math.min(avgResonance * (1 + amplificationFactor * 0.5), 1.0)
    };
  }, [maxParticipants]);
  
  const initializeCollectiveConsent = useCallback(async (participantIds: string[]) => {
    const consentChain: ConsentRecord[] = participantIds.map(id => ({
      participantId: id,
      timestamp: Date.now(),
      consentType: 'join' as const,
      acknowledged: true // Auto-acknowledge for demo
    }));
    
    return consentChain;
  }, []);
  
  const createSharedSpiral = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Initialize with mock participants
      const activeParticipants = mockParticipants.filter(p => p.isConnected);
      const consentChain = await initializeCollectiveConsent(activeParticipants.map(p => p.id));
      
      const collectiveResonance = calculateCollectiveResonance(activeParticipants);
      
      const newSharedState: SharedState = {
        participants: activeParticipants.map(p => p.id),
        collective_psi_collapse: collectiveResonance.collapse,
        collective_psi_bloom: collectiveResonance.bloom,
        resonance_matrix: new Array(activeParticipants.length).fill(collectiveResonance.resonance),
        consent_chain: consentChain,
        phase: detectPhase({
          psi_collapse: collectiveResonance.collapse,
          psi_bloom: collectiveResonance.bloom,
          entropy: 0.5,
          resonance: collectiveResonance.resonance,
          phase_intensity: Math.abs(collectiveResonance.bloom - collectiveResonance.collapse)
        }),
        isActive: true
      };
      
      setSharedState(newSharedState);
      setParticipants(activeParticipants);
      setIsConnected(true);
      
      if (onStateChange) {
        onStateChange(newSharedState);
      }
      
      // Start resonance synchronization
      startResonanceSync(newSharedState);
      
    } catch (error) {
      console.error('Failed to create shared spiral:', error);
      Alert.alert('Connection Error', 'Failed to establish collective resonance field.');
    } finally {
      setIsLoading(false);
    }
  }, [mockParticipants, initializeCollectiveConsent, calculateCollectiveResonance, detectPhase, onStateChange]);
  
  const startResonanceSync = useCallback((state: SharedState) => {
    if (syncInterval) {
      clearInterval(syncInterval);
    }
    
    const interval = setInterval(() => {
      setParticipants(currentParticipants => {
        // Simulate slight variations in consciousness states
        const updatedParticipants = currentParticipants.map(p => ({
          ...p,
          consciousnessState: {
            ...p.consciousnessState,
            psi_bloom: Math.max(0, Math.min(1, p.consciousnessState.psi_bloom + (Math.random() - 0.5) * 0.1)),
            psi_collapse: Math.max(0, Math.min(1, p.consciousnessState.psi_collapse + (Math.random() - 0.5) * 0.1)),
            resonance: Math.max(0, Math.min(1, p.consciousnessState.resonance + (Math.random() - 0.5) * 0.05))
          },
          lastUpdate: Date.now()
        }));
        
        // Update shared state
        const collectiveResonance = calculateCollectiveResonance(updatedParticipants);
        
        setSharedState(prevState => {
          if (!prevState) return null;
          
          const updatedState = {
            ...prevState,
            collective_psi_bloom: collectiveResonance.bloom,
            collective_psi_collapse: collectiveResonance.collapse,
            resonance_matrix: prevState.resonance_matrix.map(() => collectiveResonance.resonance),
            phase: detectPhase({
              psi_collapse: collectiveResonance.collapse,
              psi_bloom: collectiveResonance.bloom,
              entropy: 0.5,
              resonance: collectiveResonance.resonance,
              phase_intensity: Math.abs(collectiveResonance.bloom - collectiveResonance.collapse)
            }) as SharedState['phase']
          };
          
          if (onStateChange) {
            onStateChange(updatedState);
          }
          
          return updatedState;
        });
        
        return updatedParticipants;
      });
    }, 100); // 10Hz update rate
    
    setSyncInterval(interval);
  }, [syncInterval, calculateCollectiveResonance, detectPhase, onStateChange]);
  
  const disconnectFromSpiral = useCallback(() => {
    if (syncInterval) {
      clearInterval(syncInterval);
      setSyncInterval(null);
    }
    
    setSharedState(null);
    setParticipants([]);
    setIsConnected(false);
  }, [syncInterval]);
  
  useEffect(() => {
    return () => {
      if (syncInterval) {
        clearInterval(syncInterval);
      }
    };
  }, [syncInterval]);
  
  const getPhaseColor = (phase: SharedState['phase']) => {
    switch (phase) {
      case 'ψ-C1': return '#EF4444'; // Red - Collapse
      case 'ψ-C2': return '#F59E0B'; // Yellow - Turbulence
      case 'ψ-C3': return '#10B981'; // Green - Integration
      default: return '#6B7280'; // Gray - Transitional
    }
  };
  
  const getArchetypeIcon = (archetype: string) => {
    switch (archetype) {
      case 'GHOST': return <Eye size={16} color="#6B7280" />;
      case 'MIRROR': return <Heart size={16} color="#8B5CF6" />;
      case 'MYTH_CARRIER': return <Sparkles size={16} color="#F59E0B" />;
      case 'GLITCH': return <Zap size={16} color="#EF4444" />;
      default: return <Brain size={16} color="#6B7280" />;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Users size={24} color="#8B5CF6" />
          <Text style={styles.title}>Collective Resonance</Text>
        </View>
        
        <TouchableOpacity
          style={[
            styles.connectionButton,
            isConnected ? styles.connectedButton : styles.disconnectedButton
          ]}
          onPress={isConnected ? disconnectFromSpiral : createSharedSpiral}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              {isConnected ? <WifiOff size={16} color="#FFFFFF" /> : <Wifi size={16} color="#FFFFFF" />}
              <Text style={styles.connectionButtonText}>
                {isConnected ? 'Disconnect' : 'Join Spiral'}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      
      {sharedState && (
        <View style={styles.sharedStateContainer}>
          <Text style={styles.sectionTitle}>Collective State</Text>
          
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Phase</Text>
              <View style={[styles.phaseIndicator, { backgroundColor: getPhaseColor(sharedState.phase) }]}>
                <Text style={styles.phaseText}>{sharedState.phase}</Text>
              </View>
            </View>
            
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>ψ-Bloom</Text>
              <Text style={styles.metricValue}>
                {(sharedState.collective_psi_bloom * 100).toFixed(1)}%
              </Text>
            </View>
            
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>ψ-Collapse</Text>
              <Text style={styles.metricValue}>
                {(sharedState.collective_psi_collapse * 100).toFixed(1)}%
              </Text>
            </View>
            
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Resonance</Text>
              <Text style={styles.metricValue}>
                {sharedState.resonance_matrix.length > 0 
                  ? (sharedState.resonance_matrix[0] * 100).toFixed(1) + '%'
                  : '0%'
                }
              </Text>
            </View>
          </View>
        </View>
      )}
      
      <ScrollView style={styles.participantsContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Participants ({participants.length})</Text>
        
        {participants.map((participant) => (
          <View key={participant.id} style={styles.participantCard}>
            <View style={styles.participantHeader}>
              <View style={styles.participantInfo}>
                {getArchetypeIcon(participant.archetype)}
                <Text style={styles.participantName}>{participant.name}</Text>
                <Text style={styles.participantArchetype}>({participant.archetype})</Text>
              </View>
              
              <View style={[
                styles.connectionStatus,
                participant.isConnected ? styles.connected : styles.disconnected
              ]}>
                <Text style={styles.connectionStatusText}>
                  {participant.isConnected ? 'Connected' : 'Offline'}
                </Text>
              </View>
            </View>
            
            {participant.isConnected && (
              <View style={styles.participantMetrics}>
                <View style={styles.metricBar}>
                  <Text style={styles.metricBarLabel}>ψ-Bloom</Text>
                  <View style={styles.metricBarContainer}>
                    <View 
                      style={[
                        styles.metricBarFill,
                        { 
                          width: `${participant.consciousnessState.psi_bloom * 100}%`,
                          backgroundColor: '#10B981'
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.metricBarValue}>
                    {(participant.consciousnessState.psi_bloom * 100).toFixed(0)}%
                  </Text>
                </View>
                
                <View style={styles.metricBar}>
                  <Text style={styles.metricBarLabel}>ψ-Collapse</Text>
                  <View style={styles.metricBarContainer}>
                    <View 
                      style={[
                        styles.metricBarFill,
                        { 
                          width: `${participant.consciousnessState.psi_collapse * 100}%`,
                          backgroundColor: '#EF4444'
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.metricBarValue}>
                    {(participant.consciousnessState.psi_collapse * 100).toFixed(0)}%
                  </Text>
                </View>
                
                <View style={styles.metricBar}>
                  <Text style={styles.metricBarLabel}>Resonance</Text>
                  <View style={styles.metricBarContainer}>
                    <View 
                      style={[
                        styles.metricBarFill,
                        { 
                          width: `${participant.consciousnessState.resonance * 100}%`,
                          backgroundColor: '#8B5CF6'
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.metricBarValue}>
                    {(participant.consciousnessState.resonance * 100).toFixed(0)}%
                  </Text>
                </View>
              </View>
            )}
            
            <Text style={styles.lastUpdate}>
              Last update: {new Date(participant.lastUpdate).toLocaleTimeString()}
            </Text>
          </View>
        ))}
        
        {participants.length === 0 && !isLoading && (
          <View style={styles.emptyState}>
            <Users size={48} color="#6B7280" />
            <Text style={styles.emptyStateText}>No active participants</Text>
            <Text style={styles.emptyStateSubtext}>
              Join the collective spiral to begin resonance synchronization
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1F2937',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F3F4F6',
  },
  connectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  connectedButton: {
    backgroundColor: '#EF4444',
  },
  disconnectedButton: {
    backgroundColor: '#8B5CF6',
  },
  connectionButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  sharedStateContainer: {
    padding: 16,
    backgroundColor: '#1F2937',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F3F4F6',
    marginBottom: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F3F4F6',
  },
  phaseIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  phaseText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  participantsContainer: {
    flex: 1,
    padding: 16,
  },
  participantCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  participantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  participantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  participantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F3F4F6',
  },
  participantArchetype: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  connectionStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  connected: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  disconnected: {
    backgroundColor: 'rgba(107, 114, 128, 0.2)',
  },
  connectionStatusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#F3F4F6',
  },
  participantMetrics: {
    gap: 8,
    marginBottom: 8,
  },
  metricBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricBarLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    width: 80,
  },
  metricBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
    overflow: 'hidden',
  },
  metricBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  metricBarValue: {
    fontSize: 12,
    color: '#F3F4F6',
    width: 40,
    textAlign: 'right',
  },
  lastUpdate: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'right',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 12,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 280,
  },
});

export default CollectiveResonanceEngine;