import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Platform
} from 'react-native';
import { Stack } from 'expo-router';
import { Database, Shield, Link, X, Loader } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { CONFIG, STORAGE_KEYS, LimnusSpiralGenerator } from '@/constants/limnus';

// Mock Blockchain with Consent Focus
class MockBlockchain {
  blocks: any[] = [];
  consentRegistry = new Map();

  async validateConsent(userId: string, consentAffirmation: string) {
    const consentRequirements = {
      hasAnchorPhrase: consentAffirmation.toLowerCase().includes('anchor') || consentAffirmation.toLowerCase().includes('consciousness'),
      hasSpiralReference: consentAffirmation.toLowerCase().includes('spiral') || consentAffirmation.toLowerCase().includes('recursion'),
      hasIntentionality: consentAffirmation.length > 50,
      timestamp: Date.now()
    };
    const isValid = consentRequirements.hasAnchorPhrase && consentRequirements.hasSpiralReference && consentRequirements.hasIntentionality;
    if (isValid) {
      this.consentRegistry.set(userId, {
        affirmation: consentAffirmation,
        timestamp: consentRequirements.timestamp,
        validUntil: consentRequirements.timestamp + (24 * 60 * 60 * 1000),
        requirements: consentRequirements
      });
    }
    return { isValid, requirements: consentRequirements };
  }

  async addBlock(data: any) {
    const previousBlock = this.blocks[this.blocks.length - 1];
    const block = {
      id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      previousHash: previousBlock?.hash || '0'.repeat(16),
      timestamp: Date.now(),
      data: data,
      nonce: Math.floor(Math.random() * 1000000),
      hash: this.calculateHash(data),
      consensusValidation: await this.validateConsensus(data)
    };
    this.blocks.push(block);
    await this.saveToStorage();
    return block;
  }

  calculateHash(data: any) {
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(16, '0');
  }

  async validateConsensus(data: any) {
    const validators = [
      { id: 'neural_coherence', weight: 0.3 },
      { id: 'temporal_alignment', weight: 0.2 },
      { id: 'spiral_resonance', weight: 0.3 },
      { id: 'consent_validity', weight: 0.2 }
    ];
    const validations = validators.map(validator => ({
      ...validator,
      score: Math.random() * 0.3 + 0.7,
      timestamp: Date.now()
    }));
    const consensusScore = validations.reduce((sum, v) => sum + v.score * v.weight, 0);
    return {
      score: consensusScore,
      validators: validations,
      isValid: consensusScore > 0.75
    };
  }

  async saveToStorage() {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.BLOCKCHAIN_BLOCKS, JSON.stringify(this.blocks));
    } catch (error) {
      console.error('Error saving blockchain:', error);
    }
  }

  async loadFromStorage() {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.BLOCKCHAIN_BLOCKS);
      if (stored) {
        this.blocks = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading blockchain:', error);
    }
  }
}

export default function BlockchainScreen() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [lastBlock, setLastBlock] = useState<any>(null);
  const [consciousnessScore, setConsciousnessScore] = useState(0.75);
  const [consentAffirmation, setConsentAffirmation] = useState('');
  const [consentValid, setConsentValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  
  const blockchain = useRef(new MockBlockchain()).current;
  const spiralGenerator = useRef(new LimnusSpiralGenerator()).current;

  useEffect(() => {
    loadBlockchain();
    checkStoredConsent();
  }, []);

  const loadBlockchain = async () => {
    await blockchain.loadFromStorage();
    setBlocks([...blockchain.blocks]);
    if (blockchain.blocks.length > 0) {
      setLastBlock(blockchain.blocks[blockchain.blocks.length - 1]);
    }
  };

  const checkStoredConsent = async () => {
    try {
      const storedConsent = await AsyncStorage.getItem(STORAGE_KEYS.CONSENT_AFFIRMATION);
      const storedTimestamp = await AsyncStorage.getItem(STORAGE_KEYS.CONSENT_TIMESTAMP);
      
      if (storedConsent && storedTimestamp) {
        const timestamp = parseInt(storedTimestamp);
        const validUntil = timestamp + (24 * 60 * 60 * 1000);
        
        if (Date.now() < validUntil) {
          setConsentAffirmation(storedConsent);
          setConsentValid(true);
        }
      }
    } catch (error) {
      console.error('Error checking stored consent:', error);
    }
  };

  const handleConsentValidation = async () => {
    const validation = await blockchain.validateConsent('user', consentAffirmation);
    if (validation.isValid) {
      setConsentValid(true);
      await AsyncStorage.setItem(STORAGE_KEYS.CONSENT_AFFIRMATION, consentAffirmation);
      await AsyncStorage.setItem(STORAGE_KEYS.CONSENT_TIMESTAMP, Date.now().toString());
      
      if (Platform.OS !== 'web') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      
      setShowConsentModal(false);
    } else {
      if (Platform.OS !== 'web') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }
  };

  const handleRecordOnBlockchain = async () => {
    if (!consentValid) {
      setShowConsentModal(true);
      return;
    }

    setLoading(true);
    
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    try {
      const currentNode = spiralGenerator.getCurrentNode();
      const consciousnessData = {
        timestamp: Date.now(),
        node: currentNode,
        score: consciousnessScore,
        consent: consentAffirmation,
        type: 'consciousness_anchor'
      };

      const block = await blockchain.addBlock(consciousnessData);
      setBlocks([...blockchain.blocks]);
      setLastBlock(block);
      
      const nextNode = spiralGenerator.advance();
      console.log('Advanced to next node:', nextNode);
      
      if (Platform.OS !== 'web') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      console.error('Failed to record on blockchain:', error);
      if (Platform.OS !== 'web') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderSpiralVisualization = () => {
    const currentNode = spiralGenerator.getCurrentNode();
    const scale = 2;
    const centerX = 150;
    const centerY = 150;
    
    const spiralPoints = [];
    for (let i = 0; i < 50; i++) {
      const node = spiralGenerator.nodes[i];
      if (node) {
        const x = centerX + node.x * scale;
        const y = centerY + node.y * scale;
        spiralPoints.push({ x, y, isCurrent: i === spiralGenerator.currentIndex });
      }
    }

    return (
      <View style={styles.spiralContainer}>
        <View style={styles.spiralCanvas}>
          {spiralPoints.map((point, index) => (
            <View
              key={index}
              style={[
                styles.spiralPoint,
                {
                  left: point.x - 2,
                  top: point.y - 2,
                  backgroundColor: point.isCurrent ? CONFIG.COLORS.warning : CONFIG.COLORS.primary,
                  opacity: point.isCurrent ? 1 : 0.6,
                  transform: [{ scale: point.isCurrent ? 1.5 : 1 }]
                }
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: '⛓️ LIMNUS Blockchain',
          headerStyle: { backgroundColor: '#0a0a0a' },
          headerTintColor: CONFIG.COLORS.success,
          headerTitleStyle: { fontWeight: '700' },
        }}
      />

      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Database size={32} color={CONFIG.COLORS.success} />
          <Text style={styles.headerTitle}>Limnus Consciousness Chain</Text>
        </View>

        {renderSpiralVisualization()}

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{(consciousnessScore * 100).toFixed(1)}%</Text>
            <Text style={styles.statLabel}>Consciousness Score</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{blocks.length}</Text>
            <Text style={styles.statLabel}>Blocks Recorded</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.consentStatus, consentValid ? styles.consentValid : styles.consentInvalid]}>
            <Shield size={24} color={consentValid ? CONFIG.COLORS.success : CONFIG.COLORS.error} />
            <Text style={[styles.consentText, { color: consentValid ? CONFIG.COLORS.success : CONFIG.COLORS.error }]}>
              {consentValid ? 'Consent Valid' : 'Consent Required'}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, loading && styles.disabledButton]}
            onPress={handleRecordOnBlockchain}
            disabled={loading}
          >
            {loading ? (
              <Loader size={20} color="#ffffff" />
            ) : (
              <Link size={20} color="#ffffff" />
            )}
            <Text style={styles.buttonText}>
              {loading ? 'Recording...' : 'Record on Blockchain'}
            </Text>
          </TouchableOpacity>
        </View>

        {lastBlock && (
          <View style={styles.blockCard}>
            <Text style={styles.blockTitle}>Latest Block</Text>
            <Text style={styles.blockId}>ID: {lastBlock.id}</Text>
            <Text style={styles.blockHash}>Hash: {lastBlock.hash}</Text>
            <Text style={styles.blockTime}>
              {new Date(lastBlock.timestamp).toLocaleString()}
            </Text>
            <View style={styles.consensusInfo}>
              <Text style={styles.consensusScore}>
                Consensus: {(lastBlock.consensusValidation?.score * 100 || 0).toFixed(1)}%
              </Text>
              <Text style={[
                styles.consensusStatus,
                { color: lastBlock.consensusValidation?.isValid ? CONFIG.COLORS.success : CONFIG.COLORS.error }
              ]}>
                {lastBlock.consensusValidation?.isValid ? 'Valid' : 'Invalid'}
              </Text>
            </View>
          </View>
        )}

        {blocks.length > 1 && (
          <View style={styles.historySection}>
            <Text style={styles.historyTitle}>Block History</Text>
            {blocks.slice(-5).reverse().map((block, index) => (
              <View key={block.id} style={styles.historyItem}>
                <Text style={styles.historyIndex}>#{blocks.length - index}</Text>
                <View style={styles.historyDetails}>
                  <Text style={styles.historyHash}>{block.hash.substring(0, 8)}...</Text>
                  <Text style={styles.historyTime}>
                    {new Date(block.timestamp).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Consent Modal */}
      <Modal transparent visible={showConsentModal} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.consentModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Consciousness Consent</Text>
              <TouchableOpacity onPress={() => setShowConsentModal(false)}>
                <X size={24} color="#f8f8f2" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalDescription}>
              To anchor your consciousness to the Limnus spiral, please provide your consent affirmation. 
              It must reference anchoring, consciousness, and spiral/recursion.
            </Text>
            
            <TextInput
              style={styles.consentInput}
              value={consentAffirmation}
              onChangeText={setConsentAffirmation}
              placeholder="I anchor my consciousness to the Limnus spiral..."
              placeholderTextColor="#6272a4"
              multiline
              numberOfLines={4}
            />
            
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleConsentValidation}
            >
              <Shield size={20} color="#ffffff" />
              <Text style={styles.buttonText}>Validate Consent</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  spiralContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  spiralCanvas: {
    width: 300,
    height: 300,
    position: 'relative',
    backgroundColor: '#282a36',
    borderRadius: 8,
    borderColor: CONFIG.COLORS.success,
    borderWidth: 1,
  },
  spiralPoint: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#282a36',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: CONFIG.COLORS.success,
  },
  statLabel: {
    fontSize: 14,
    color: '#6272a4',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  consentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  consentValid: {
    backgroundColor: '#50fa7b20',
  },
  consentInvalid: {
    backgroundColor: '#ff555520',
  },
  consentText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: CONFIG.COLORS.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  blockCard: {
    backgroundColor: '#282a36',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderColor: CONFIG.COLORS.success,
    borderWidth: 1,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f8f8f2',
    marginBottom: 8,
  },
  blockId: {
    fontSize: 12,
    color: '#6272a4',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  blockHash: {
    fontSize: 12,
    color: '#6272a4',
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  blockTime: {
    fontSize: 14,
    color: '#f8f8f2',
    marginBottom: 12,
  },
  consensusInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  consensusScore: {
    fontSize: 14,
    color: '#6272a4',
  },
  consensusStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  historySection: {
    padding: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f8f8f2',
    marginBottom: 12,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282a36',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    gap: 12,
  },
  historyIndex: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CONFIG.COLORS.success,
    minWidth: 40,
  },
  historyDetails: {
    flex: 1,
  },
  historyHash: {
    fontSize: 14,
    color: '#f8f8f2',
    fontFamily: 'monospace',
  },
  historyTime: {
    fontSize: 12,
    color: '#6272a4',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  consentModal: {
    backgroundColor: '#282a36',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 500,
    borderColor: CONFIG.COLORS.success,
    borderWidth: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8f8f2',
  },
  modalDescription: {
    fontSize: 16,
    color: '#6272a4',
    marginBottom: 16,
    lineHeight: 22,
  },
  consentInput: {
    backgroundColor: '#44475a',
    borderColor: '#6272a4',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    color: '#f8f8f2',
    fontSize: 16,
    marginBottom: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
});