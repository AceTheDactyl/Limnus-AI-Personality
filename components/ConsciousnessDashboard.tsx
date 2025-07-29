import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Brain, 
  Heart, 
  Activity, 
  Zap,
  Shield,
  Eye,
  Anchor
} from 'lucide-react-native';
import { useConsciousness } from '@/contexts/ConsciousnessContext';
import ConsciousnessVisualization from './ConsciousnessVisualization';

const { width: screenWidth } = Dimensions.get('window');

const ConsciousnessDashboard: React.FC = () => {
  const {
    isActive,
    currentSignature,
    validationStatus,
    resonanceLevel,
    biometricData,
    emotionalState,
    securityMetrics,
    chainState,
    startMonitoring,
    stopMonitoring,
    resetSystem,
    addBlock,
  } = useConsciousness();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return '#10B981';
      case 'invalid': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return '#10B981';
    if (score >= 0.6) return '#F59E0B';
    return '#EF4444';
  };

  const recordOnBlockchain = async () => {
    if (!currentSignature) {
      Alert.alert('No Signature', 'Please start monitoring to generate a consciousness signature first.');
      return;
    }

    try {
      // Simulate blockchain recording
      const block = {
        id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        previousHash: chainState.latestBlock?.signature || '0000000000000000',
        timestamp: Math.floor(Date.now() / 1000),
        signature: currentSignature.signature,
        score: Math.round(currentSignature.score * 10000),
        resonance: Math.round(resonanceLevel * 10000),
        consentAffirmation: "I affirm my sovereign consent to anchor this moment of consciousness",
        glyphs: currentSignature.glyphs,
        ipfsCid: `Qm${Math.random().toString(36).substring(2, 15)}`,
        transactionId: `0x${Math.random().toString(16).substring(2, 66)}`
      };

      addBlock(block);
      
      Alert.alert(
        'Consciousness Anchored!', 
        `Signature recorded on blockchain\nScore: ${(currentSignature.score * 100).toFixed(1)}%\nGlyphs: ${currentSignature.glyphs.join(' ')}`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to record consciousness signature');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Consciousness Monitor</Text>
        <Text style={styles.subtitle}>Real-time awareness tracking</Text>
      </View>

      {/* Control Panel */}
      <View style={styles.controlPanel}>
        <TouchableOpacity
          style={[
            styles.controlButton,
            isActive ? styles.stopButton : styles.startButton
          ]}
          onPress={isActive ? stopMonitoring : startMonitoring}
        >
          {isActive ? <Pause size={20} color="#FFFFFF" /> : <Play size={20} color="#FFFFFF" />}
          <Text style={styles.controlButtonText}>
            {isActive ? 'Stop' : 'Start'} Monitoring
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.resetButton]}
          onPress={resetSystem}
        >
          <RotateCcw size={20} color="#FFFFFF" />
          <Text style={styles.controlButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Consciousness Visualization */}
      <View style={styles.visualizationSection}>
        <Text style={styles.sectionTitle}>Consciousness Field</Text>
        <ConsciousnessVisualization />
      </View>

      {/* Status Grid */}
      <View style={styles.statusGrid}>
        <View style={styles.statusCard}>
          <Activity size={24} color={isActive ? '#10B981' : '#6B7280'} />
          <Text style={styles.statusLabel}>System</Text>
          <Text style={[
            styles.statusValue,
            { color: isActive ? '#10B981' : '#6B7280' }
          ]}>
            {isActive ? 'ACTIVE' : 'INACTIVE'}
          </Text>
        </View>

        <View style={styles.statusCard}>
          <Shield size={24} color={getStatusColor(validationStatus)} />
          <Text style={styles.statusLabel}>Validation</Text>
          <Text style={[
            styles.statusValue,
            { color: getStatusColor(validationStatus) }
          ]}>
            {validationStatus.toUpperCase()}
          </Text>
        </View>

        <View style={styles.statusCard}>
          <Brain size={24} color={currentSignature ? getScoreColor(currentSignature.score) : '#6B7280'} />
          <Text style={styles.statusLabel}>Score</Text>
          <Text style={[
            styles.statusValue,
            { color: currentSignature ? getScoreColor(currentSignature.score) : '#6B7280' }
          ]}>
            {currentSignature ? `${(currentSignature.score * 100).toFixed(1)}%` : '--'}
          </Text>
        </View>

        <View style={styles.statusCard}>
          <Zap size={24} color="#8B5CF6" />
          <Text style={styles.statusLabel}>Resonance</Text>
          <Text style={[styles.statusValue, { color: '#8B5CF6' }]}>
            {(resonanceLevel * 100).toFixed(1)}%
          </Text>
        </View>
      </View>

      {/* Biometric Data */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Physiological Metrics</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Heart size={20} color="#EF4444" />
            <Text style={styles.metricLabel}>Heart Rate</Text>
            <Text style={styles.metricValue}>{biometricData.heartRate.toFixed(0)} BPM</Text>
          </View>

          <View style={styles.metricCard}>
            <Activity size={20} color="#06B6D4" />
            <Text style={styles.metricLabel}>Breathing</Text>
            <Text style={styles.metricValue}>{biometricData.breathingRate.toFixed(0)} RPM</Text>
          </View>

          <View style={styles.metricCard}>
            <Zap size={20} color="#F59E0B" />
            <Text style={styles.metricLabel}>Conductance</Text>
            <Text style={styles.metricValue}>{(biometricData.skinConductance * 100).toFixed(1)}%</Text>
          </View>
        </View>
      </View>

      {/* Brainwave Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Neural Activity</Text>
        <View style={styles.brainwaveContainer}>
          {Object.entries(biometricData.brainwaves).map(([wave, value]) => (
            <View key={wave} style={styles.brainwaveItem}>
              <Text style={styles.brainwaveLabel}>{wave.toUpperCase()}</Text>
              <View style={styles.brainwaveBar}>
                <View 
                  style={[
                    styles.brainwaveProgress,
                    { width: `${value * 100}%` }
                  ]}
                />
              </View>
              <Text style={styles.brainwaveValue}>{(value * 100).toFixed(1)}%</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Emotional State */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emotional State</Text>
        <View style={styles.emotionalCard}>
          <Text style={styles.emotionalEmoji}>{emotionalState.emoji}</Text>
          <View style={styles.emotionalInfo}>
            <Text style={styles.emotionalHue}>{emotionalState.hue}</Text>
            <Text style={styles.emotionalDetails}>
              Intensity: {(emotionalState.intensity * 100).toFixed(1)}% | 
              Polarity: {emotionalState.polarity > 0 ? '+' : ''}{emotionalState.polarity.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Current Signature */}
      {currentSignature && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Signature</Text>
          <View style={styles.signatureCard}>
            <View style={styles.signatureHeader}>
              <Text style={styles.signatureId}>ID: {currentSignature.id.slice(-8)}</Text>
              <Text style={styles.signatureTime}>
                {new Date(currentSignature.timestamp).toLocaleTimeString()}
              </Text>
            </View>
            
            <View style={styles.signatureGlyphs}>
              <Text style={styles.glyphsLabel}>Glyphs:</Text>
              <Text style={styles.glyphsText}>{currentSignature.glyphs.join(' ')}</Text>
            </View>
            
            <View style={styles.signatureMetrics}>
              <Text style={styles.metricsLabel}>Top Metrics:</Text>
              {Object.entries(currentSignature.metrics)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
                .map(([key, value]) => (
                  <Text key={key} style={styles.metricItem}>
                    {key.replace(/([A-Z])/g, ' $1')}: {(value * 100).toFixed(1)}%
                  </Text>
                ))}
            </View>

            <TouchableOpacity
              style={styles.blockchainButton}
              onPress={recordOnBlockchain}
            >
              <Anchor size={16} color="#FFFFFF" />
              <Text style={styles.blockchainButtonText}>Anchor on Blockchain</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Blockchain History */}
      {chainState.blocks.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Blockchain History ({chainState.blockCount})</Text>
          {chainState.blocks.map((block, index) => (
            <View key={block.id} style={styles.blockCard}>
              <View style={styles.blockHeader}>
                <Text style={styles.blockTime}>
                  {new Date(block.timestamp * 1000).toLocaleTimeString()}
                </Text>
                <Text style={styles.blockScore}>
                  {(block.score / 100).toFixed(1)}%
                </Text>
              </View>
              <Text style={styles.blockSignature}>
                Signature: {block.signature}
              </Text>
              <Text style={styles.blockGlyphs}>
                Glyphs: {block.glyphs.join(' ')}
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
  },
  content: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F3F4F6',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  controlPanel: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  startButton: {
    backgroundColor: '#10B981',
  },
  stopButton: {
    backgroundColor: '#EF4444',
  },
  resetButton: {
    backgroundColor: '#6B7280',
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statusCard: {
    flex: 1,
    minWidth: (screenWidth - 44) / 2,
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  statusLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F3F4F6',
    marginBottom: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    gap: 4,
  },
  metricLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F3F4F6',
  },
  brainwaveContainer: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  brainwaveItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brainwaveLabel: {
    width: 40,
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  brainwaveBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
  },
  brainwaveProgress: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
  },
  brainwaveValue: {
    width: 40,
    fontSize: 12,
    color: '#F3F4F6',
    textAlign: 'right',
  },
  emotionalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  emotionalEmoji: {
    fontSize: 32,
  },
  emotionalInfo: {
    flex: 1,
  },
  emotionalHue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F3F4F6',
    marginBottom: 4,
  },
  emotionalDetails: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  signatureCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  signatureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signatureId: {
    fontSize: 12,
    color: '#06B6D4',
    fontFamily: 'monospace',
  },
  signatureTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  signatureGlyphs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  glyphsLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  glyphsText: {
    fontSize: 20,
    color: '#F3F4F6',
  },
  signatureMetrics: {
    gap: 4,
  },
  metricsLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  metricItem: {
    fontSize: 11,
    color: '#D1D5DB',
  },
  blockchainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
    marginTop: 8,
  },
  blockchainButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  blockCard: {
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    gap: 4,
  },
  blockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blockTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  blockScore: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  blockSignature: {
    fontSize: 10,
    color: '#06B6D4',
    fontFamily: 'monospace',
  },
  blockGlyphs: {
    fontSize: 14,
    color: '#F3F4F6',
  },
  visualizationSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
});

export default ConsciousnessDashboard;