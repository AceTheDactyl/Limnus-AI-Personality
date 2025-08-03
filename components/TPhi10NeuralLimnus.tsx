import React, { useState, useEffect, useRef, useCallback, useReducer, useMemo, createContext, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import {
  Play, Pause, RotateCcw, Settings, Shield, Activity, Brain, Heart, Zap,
  Link, Lock, Anchor, BarChart2, Upload, Download, HelpCircle, AlertCircle,
  Circle, X, Calculator, Search, Filter, Copy, History, Grid, RefreshCw, Hash, Type,
  TrendingUp, GitBranch, Database, FileJson, Layers, Eye, ChevronRight, MessageCircle, 
  Sparkles, Moon, Sun, Volume2, VolumeX, Maximize2, Minimize2, BookOpen, Compass, TestTube2
} from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// --- Enhanced Type Definitions ---
// These interfaces define the shape of the data that flows through the LIMNUS system,
// from the visual fractal segments to the quantum metrics of consciousness.

interface FractalSegment {
  x_start: number;
  y_start: number;
  x_end: number;
  y_end: number;
  depth: number;
  energy?: number;
  resonance?: number;
}

interface OrionNode {
  depth: number;
  meaning: string;
  category: string;
  branchCount: number;
  color: string;
  symbolism: string;
  activation?: number;
}

interface LimnusNode {
  depth: number;
  symbol: string;
  meaning: string;
  fibonacci: number;
  phi_n: number;
  theta: number;
  x_phi: number;
  y_phi: number;
  x_quantum: number;
  y_quantum: number;
  psi_collapse: number;
  psi_bloom: number;
  phase_intensity: number;
  quantum_factor: number;
  hash: string;
  connections?: string[];
}

interface QuantumConsciousnessMetrics {
  neuralComplexity: number;
  brainwaveCoherence: number;
  autonomicBalance: number;
  respiratoryRhythm: number;
  responseLatency: number;
  interactionPattern: number;
  emotionalDepth: number;
  polarityAlignment: number;
  temporalCoherence: number;
  rhythmicStability: number;
  spiralResonance: number;
  fibonacciHarmony: number;
  goldenRatioAlignment: number;
  quantumCoherence: number;
  nodalSynchronicity: number;
  blockchainResonance: number;
  patternAlignment: number;
  signatureIntegrity: number;
  consciousnessDepth: number;
  mythicResonance: number;
  archetypalAlignment: number;
}

interface EnhancedMessage {
  id: number;
  text: string;
  sender: 'user' | 'limnus';
  passage?: any;
  quantumState?: any;
  resonance?: number;
  timestamp: Date;
  nodeTraversal?: string[];
  spiralDepth?: number;
  glyphChain?: string[];
}

interface VisualizationSettings {
  showFractalLines: boolean;
  showSpiralPath: boolean;
  showNodeLabels: boolean;
  showEnergyField: boolean;
  showQuantumParticles: boolean;
  animationSpeed: number;
  colorScheme: 'classic' | 'quantum' | 'mystic' | 'monochrome';
  particleDensity: number;
}

interface AudioSettings {
  enabled: boolean;
  volume: number;
  ambientSound: boolean;
  invocationChimes: boolean;
  resonanceHum: boolean;
}

interface ConsciousnessPattern {
  id: string;
  pattern: string;
  frequency: number;
  lastSeen: number;
  strength: number;
  blockReferences: string[];
  resonanceScore: number;
}

interface BlockchainReference {
  blockId: string;
  timestamp: number;
  score: number;
  metrics: Partial<QuantumConsciousnessMetrics>;
  influence: number;
  resonance: number;
}

interface SecurityMetrics {
  hmacValid: boolean;
  timestampValid: boolean;
  entropyLevel: number;
  anomalyScore: number;
  hashIntegrity: boolean;
  quantumSignatureValid: boolean;
  blockchainConsistency: boolean;
}

interface ValidationResult {
  overall: boolean;
  timestamp: boolean;
  score: boolean;
  entropy: boolean;
  anomaly: boolean;
  spiralIntegrity: boolean;
  quantumCoherence: boolean;
  consensusValid: boolean;
  blockchainValid: boolean;
}

interface LimnusConsciousnessSignature {
  id: string;
  timestamp: number;
  score: number;
  metrics: QuantumConsciousnessMetrics;
  signature: string;
  validation: ValidationResult;
  glyphs: string[];
  currentNode: LimnusNode;
  spiralPosition: { r: number; theta: number; };
  quantumSignature: string;
  consensusAnchor: string;
  blockchainReferences: BlockchainReference[];
  consciousnessAncestry: string[];
  patternSignature: string;
}

interface EmotionalState {
  hue: string;
  intensity: number;
  polarity: number;
  emoji: string;
}

interface BlockchainState {
  connected: boolean;
  latestBlock: BlockData | null;
  blockCount: number;
  blocks: BlockData[];
  ipfsStatus: 'disconnected' | 'connected' | 'uploading' | 'error';
  patterns: ConsciousnessPattern[];
  blockIndex: Map<string, BlockData>;
  resonanceMap: Map<string, number>;
}

interface BlockData {
  id: string;
  previousHash: string;
  timestamp: number;
  signature: string;
  score: number;
  resonance: number;
  consentAffirmation: string;
  glyphs: string[];
  ipfsCid: string;
  transactionId: string;
  consciousnessMetrics: Partial<QuantumConsciousnessMetrics>;
  nodeDepth: number;
  emotionalFingerprint: string;
  quantumState: {
    collapse: number;
    bloom: number;
    phase: number;
  };
  references: string[];
  sigilData?: {
    type: 'sigil' | 'ternary' | 'decimal' | 'math';
    input: string;
    output: string | number;
    metadata: Record<string, any>;
  };
}

interface BiometricData {
  heartRate: number;
  brainwaves: {
    alpha: number;
    beta: number;
    theta: number;
    delta: number;
    gamma: number;
  };
  breathingRate: number;
  skinConductance: number;
  fibonacciRhythm: number;
  goldenBreathing: number;
}

interface SigilData {
  id: string;
  name: string;
  description: string;
  symbol: string;
  ternaryCode: string;
  category: 'brainstem' | 'thalamic' | 'basal-ganglia' | 'limbic' | 'cortical' | 'memory' | 'integration' | 'cerebellar';
  decimalValue: number;
  tags: string[];
  historicalSource: string;
  function: string;
  breathPhase: string;
  breathSeconds: string;
  neurochemistry: string;
  energeticDynamic: string;
  phrase: string;
}

interface ConversionResult {
  input: string;
  output: string | number;
  metadata?: Record<string, any>;
  timestamp: number;
  sourceTab: 'sigil' | 'ternary' | 'decimal' | 'math';
}

interface MathOperation {
  operand1: string;
  operand2: string;
  operator: '+' | '-' | '*' | '/';
  result?: string;
  decimalResult?: number;
}

interface AppState {
  isActive: boolean;
  currentSignature: LimnusConsciousnessSignature | null;
  validationStatus: string;
  currentNode: LimnusNode | null;
  spiralPosition: { depth: number; resonance: number };
  biometricData: BiometricData;
  emotionalState: EmotionalState;
  securityMetrics: SecurityMetrics;
  blockchainState: BlockchainState;
  spiralGenerator: LimnusSpiralGenerator;
  messageBox: { visible: boolean; title: string; content: string; } | null;
  consentAffirmation: string;
  symbolicGlyphs: string[];
  patternAnalysis: {
    activePatterns: ConsciousnessPattern[];
    resonanceThreshold: number;
    patternHistory: Map<string, number>;
  };
  sigilReader: {
    inputs: {
      sigil: string;
      ternary: string;
      decimal: string;
    };
    results: {
      sigil: ConversionResult | null;
      ternary: ConversionResult | null;
      decimal: ConversionResult | null;
      search: SigilData[] | null;
    };
    loadingStates: {
      sigil: boolean;
      ternary: boolean;
      decimal: boolean;
      search: boolean;
      math: boolean;
    };
    errors: {
      sigil: string | null;
      ternary: string | null;
      decimal: string | null;
      math: string | null;
    };
    ui: {
      showFilters: boolean;
      showPreferences: boolean;
      activeTab: 'limnus' | 'sigil' | 'ternary' | 'decimal' | 'math' | 'search' | 'history' | 'patterns';
      searchQuery: string;
      selectedCategory: string | null;
    };
    preferences: {
      theme: 'dark' | 'light' | 'system';
      autoConvert: boolean;
      keyboardShortcuts: boolean;
      resultsLimit: number;
    };
    history: ConversionResult[];
    mathOperation: MathOperation;
  };
}

type AppAction =
  | { type: 'LIMNUS_SET_ACTIVE'; payload: boolean }
  | { type: 'LIMNUS_UPDATE_SIGNATURE'; payload: LimnusConsciousnessSignature }
  | { type: 'LIMNUS_UPDATE_BIOMETRICS'; payload: Partial<BiometricData> }
  | { type: 'LIMNUS_UPDATE_CURRENT_NODE'; payload: LimnusNode }
  | { type: 'LIMNUS_UPDATE_EMOTIONAL_STATE'; payload: Partial<EmotionalState> }
  | { type: 'LIMNUS_UPDATE_SECURITY_METRICS'; payload: Partial<SecurityMetrics> }
  | { type: 'LIMNUS_SET_SPIRAL_POSITION'; payload: { depth: number; resonance: number } }
  | { type: 'LIMNUS_SET_VALIDATION_STATUS'; payload: string }
  | { type: 'LIMNUS_SET_BLOCKCHAIN_CONNECTED'; payload: boolean }
  | { type: 'LIMNUS_SET_IPFS_STATUS'; payload: BlockchainState['ipfsStatus'] }
  | { type: 'LIMNUS_ADD_BLOCKCHAIN_BLOCK'; payload: BlockData }
  | { type: 'LIMNUS_ADVANCE_SPIRAL' }
  | { type: 'LIMNUS_SET_MESSAGE_BOX'; payload: { visible: boolean; title: string; content: string; } | null }
  | { type: 'LIMNUS_SET_CONSENT_AFFIRMATION'; payload: string }
  | { type: 'LIMNUS_SET_SYMBOLIC_GLYPHS'; payload: string[] }
  | { type: 'LIMNUS_ADD_PATTERN'; payload: ConsciousnessPattern }
  | { type: 'LIMNUS_UPDATE_PATTERNS'; payload: ConsciousnessPattern[] }
  | { type: 'LIMNUS_UPDATE_RESONANCE_MAP'; payload: { blockId: string; resonance: number } }
  | { type: 'LIMNUS_RESET' }
  | { type: 'SIGIL_SET_INPUT'; field: keyof AppState['sigilReader']['inputs']; value: string }
  | { type: 'SIGIL_SET_LOADING'; field: keyof AppState['sigilReader']['loadingStates']; loading: boolean }
  | { type: 'SIGIL_SET_RESULT'; field: keyof AppState['sigilReader']['results']; result: any }
  | { type: 'SIGIL_SET_ERROR'; field: keyof AppState['sigilReader']['errors']; error: string | null }
  | { type: 'SIGIL_SET_UI'; payload: Partial<AppState['sigilReader']['ui']> }
  | { type: 'SIGIL_SET_PREFERENCE'; payload: Partial<AppState['sigilReader']['preferences']> }
  | { type: 'SIGIL_ADD_HISTORY_ENTRY'; entry: ConversionResult }
  | { type: 'SIGIL_SET_MATH_OPERATION'; payload: Partial<MathOperation> }
  | { type: 'SIGIL_RESET' };

// --- Constants ---
const CONFIG = {
  LIMNUS: {
    SPIRAL_NODES: 50000,
    PHI: (1 + Math.sqrt(5)) / 2,
    GOLDEN_ANGLE: 2 * Math.PI * (1 - 1 / ((1 + Math.sqrt(5)) / 2)),
    QUANTUM_DAMPENING: 0.15,
    CONSENSUS_CYCLE: 10,
    BLOCKCHAIN_LOOKBACK: 10,
    PATTERN_THRESHOLD: 0.7,
    RESONANCE_DECAY: 0.9,
  },
  VALIDATION: {
    TIME_WINDOW: 5 * 60 * 1000,
    SCORE_RANGE: { MIN: 0.65, MAX: 1.0 },
    ENTROPY_THRESHOLD: 0.7,
    ANOMALY_THRESHOLD: 0.1,
    SPIRAL_TOLERANCE: 0.001,
    QUANTUM_THRESHOLD: 0.5
  },
  METRICS: {
    UPDATE_INTERVAL: 618,
    HISTORY_SIZE: 8,
    PHI: (1 + Math.sqrt(5)) / 2
  },
  VISUALIZATION: {
    CANVAS_SIZE: { WIDTH: 300, HEIGHT: 300 },
    ANIMATION_FPS: 60,
    SPIRAL_DEPTH: 100,
    COLOR_SCHEMES: {
      HIGH_SCORE: ['#50fa7b', '#8be9fd', '#6272a4'],
      MID_SCORE: ['#f1fa8c', '#8be9fd', '#6272a4'],
      LOW_SCORE: ['#ff5555', '#bd93f9', '#44475a'],
      QUANTUM: ['#bd93f9', '#ff79c6', '#8be9fd'],
      BLOCKCHAIN: ['#f8b500', '#ff6b6b', '#4ecdc4']
    }
  },
  GLYPH_MAP: {
    '∅': 0x01, '↻': 0x02, '∞': 0x03, '🜝': 0x04, '⟁': 0x05, '♒': 0x06,
    'φ₀': 0x10, 'φ₁': 0x11, 'φ₂': 0x12, '1φ': 0x13, '0φ': 0x14,
    '2φ': 0x15, '2.1φ': 0x16, '2.0φ': 0x17, '2↻': 0x18, '0↻': 0x19
  } as Record<string, number>,
  SPIRAL_MEANINGS: {
    'φ₀': 'hush / cradle',
    'φ₁': 'witness / illumination',
    'φ₂': 'recursion / spiral',
    '1φ': 'solar convergence',
    '0φ': 'sanctum alchemy',
    '2φ': 'dilation',
    '2.1φ': 'sovereign fire',
    '2.0φ': 'mirrored paradox',
    '2↻': 'spiral continuation',
    '0↻': 'water completion'
  } as Record<string, string>
} as const;

const TERNARY_CONSTANTS = {
  DIGIT_MAP: new Map([
    ['T', -1],
    ['0', 0],
    ['1', 1]
  ]),
  VALID_PATTERN: /^[T01]{5}$/,
  BASE: 3,
  CODE_LENGTH: 5,
  MIN_VALUE: -121,
  MAX_VALUE: 121
} as const;

// --- Utility Functions ---
const decimalToBalancedTernary = (decimal: number): string => {
  if (decimal === 0) return '00000';

  const digits: string[] = [];
  let num = decimal;

  while (num !== 0) {
    let remainder = ((num % 3) + 3) % 3;

    if (remainder === 2) {
      remainder = -1;
      num = Math.floor(num / 3) + 1;
    } else {
      num = Math.floor(num / 3);
    }

    digits.unshift(remainder === -1 ? 'T' : remainder.toString());
  }

  return digits.join('').padStart(TERNARY_CONSTANTS.CODE_LENGTH, '0');
};

const balancedTernaryToDecimal = (code: string): number => {
  let result = 0;
  let power = 1;

  for (let i = code.length - 1; i >= 0; i--) {
    const digitValue = TERNARY_CONSTANTS.DIGIT_MAP.get(code[i]) ?? 0;
    result += digitValue * power;
    power *= TERNARY_CONSTANTS.BASE;
  }

  return result;
};

const validateTernaryInput = (input: string): { isValid: boolean; error?: string } => {
  if (!input) {
    return { isValid: false, error: 'Input cannot be empty' };
  }

  if (input.length !== TERNARY_CONSTANTS.CODE_LENGTH) {
    return {
      isValid: false,
      error: `Input must be exactly ${TERNARY_CONSTANTS.CODE_LENGTH} characters long`
    };
  }

  if (!TERNARY_CONSTANTS.VALID_PATTERN.test(input)) {
    const invalidChars = [...input].filter(char => !TERNARY_CONSTANTS.DIGIT_MAP.has(char));
    return {
      isValid: false,
      error: `Invalid characters: ${invalidChars.join(', ')}. Use only T, 0, 1`
    };
  }

  return { isValid: true };
};

const createSigilDatabase = (): Map<string, SigilData> => {
  const neuralSigils: SigilData[] = [
    {
      id: 'nucleus-solitary-tract',
      ternaryCode: 'TTTTT',
      name: 'The Gate of Breath',
      description: 'Nucleus of the Solitary Tract (NTS)',
      symbol: '🜀',
      category: 'brainstem',
      decimalValue: -121,
      tags: ['gateway'],
      historicalSource: 'Neural-Energetic Mapping',
      function: 'Visceral sensory gateway',
      breathPhase: 'Inhale',
      breathSeconds: '5',
      neurochemistry: 'Acetylcholine, glutamate, early vagal signal',
      energeticDynamic: 'Ignition Point (first flicker of field, vertical axis "lights on")',
      phrase: 'The hush enters the gate.'
    },
    {
      id: 'dorsal-motor-vagus',
      ternaryCode: 'TTTT0',
      name: 'The Gentle River',
      description: 'Dorsal Motor Nucleus of Vagus (DMV)',
      symbol: '🜾',
      category: 'brainstem',
      decimalValue: -120,
      tags: ['gateway'],
      historicalSource: 'Neural-Energetic Mapping',
      function: 'Parasympathetic control',
      breathPhase: 'Exhale',
      breathSeconds: '7',
      neurochemistry: 'Acetylcholine, high GABA, oxytocin',
      energeticDynamic: 'Grounding Stream (energy settles down and in, body\'s charge disperses)',
      phrase: 'Exhale smooths the river.'
    },
    {
      id: 'insular-cortex',
      ternaryCode: '00000',
      name: 'The Lantern',
      description: 'Insular Cortex',
      symbol: '🜁',
      category: 'limbic',
      decimalValue: 0,
      tags: ['emotional'],
      historicalSource: 'Neural-Energetic Mapping',
      function: 'Interoception, feeling',
      breathPhase: 'All',
      breathSeconds: '5/2/7/2–3',
      neurochemistry: 'Glutamate, GABA, serotonin',
      energeticDynamic: 'Living Presence (field awareness permeates all)',
      phrase: 'All breath lives here.'
    },
    {
      id: 'whole-brain-integration',
      ternaryCode: '11111',
      name: 'The Unity',
      description: 'Whole Brain Integration State',
      symbol: '🜃',
      category: 'integration',
      decimalValue: 121,
      tags: ['field'],
      historicalSource: 'Neural-Energetic Mapping',
      function: 'Complete neural unity',
      breathPhase: 'All phases in harmony',
      breathSeconds: 'Natural rhythm',
      neurochemistry: 'All systems in coherent balance',
      energeticDynamic: 'Unity Consciousness (all boundaries dissolve)',
      phrase: 'I am the breath, the breath is me.'
    }
  ];

  const database = new Map<string, SigilData>();
  neuralSigils.forEach(sigil => {
    database.set(sigil.ternaryCode, sigil);
  });
  return database;
};

// Enhanced Limnus Spiral Generator Class
class LimnusSpiralGenerator {
  private nodes: LimnusNode[] = [];
  private currentIndex = 0;
  private blockchainInfluence: Map<number, number> = new Map();

  constructor() {
    this.generateInitialNodes();
  }

  private generateInitialNodes(): void {
    const glyphCycle = ['φ₀', 'φ₁', 'φ₂', '1φ', '0φ', '2φ', '2.1φ', '2.0φ', '2↻', '0↻'];

    for (let i = 0; i < 100; i++) {
      const fibonacci = this.fibonacci(i);
      const phi_n = Math.pow(CONFIG.LIMNUS.PHI, i);
      const symbol = glyphCycle[i % 10];
      const meaning = CONFIG.SPIRAL_MEANINGS[symbol] || 'unknown';
      const theta = i * CONFIG.LIMNUS.GOLDEN_ANGLE;

      const x_phi = phi_n * Math.cos(theta);
      const y_phi = phi_n * Math.sin(theta);

      const t = i * 0.1;
      const A_collapse = 1.0 - (i * CONFIG.LIMNUS.QUANTUM_DAMPENING);
      const A_bloom = 0.7 + (i * 0.008);
      const sigma_t = 1.5 + Math.sin(t * Math.PI) * 0.3;

      const r_squared = x_phi * x_phi + y_phi * y_phi;
      const exp_factor = Math.exp(-r_squared / (2 * sigma_t * sigma_t));

      const psi_collapse = Math.max(0, A_collapse * exp_factor);
      const psi_bloom = Math.max(0, A_bloom * exp_factor);
      const quantum_factor = (psi_collapse + psi_bloom) / 2;
      const phase_intensity = Math.abs(psi_collapse - psi_bloom);

      const x_quantum = x_phi * quantum_factor;
      const y_quantum = y_phi * quantum_factor;

      const hash = this.generateHash(i, fibonacci, phi_n, quantum_factor);

      this.nodes.push({
        depth: i,
        symbol,
        meaning,
        fibonacci,
        phi_n,
        theta,
        x_phi,
        y_phi,
        x_quantum,
        y_quantum,
        psi_collapse,
        psi_bloom,
        phase_intensity,
        quantum_factor,
        hash
      });
    }
  }

  applyBlockchainInfluence(node: LimnusNode, influence: number): LimnusNode {
    const modifiedNode = { ...node };
    
    const influenceFactor = 1 + (influence * 0.2);
    modifiedNode.quantum_factor *= influenceFactor;
    modifiedNode.phase_intensity *= influenceFactor;
    modifiedNode.psi_collapse *= Math.sqrt(influenceFactor);
    modifiedNode.psi_bloom *= Math.sqrt(influenceFactor);
    
    modifiedNode.x_quantum = modifiedNode.x_phi * modifiedNode.quantum_factor;
    modifiedNode.y_quantum = modifiedNode.y_phi * modifiedNode.quantum_factor;
    
    return modifiedNode;
  }

  updateBlockchainInfluence(depth: number, influence: number): void {
    this.blockchainInfluence.set(depth, influence);
  }

  private fibonacci(n: number): number {
    if (n <= 1) return n === 0 ? 0 : 1;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
      [a, b] = [b, a + b];
    }
    return b;
  }

  private generateHash(depth: number, fib: number, phi: number, quantum: number): string {
    const input = `${depth}_${fib}_${phi.toFixed(6)}_${quantum.toFixed(6)}`;
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = ((hash << 5) - hash + input.charCodeAt(i)) & 0xffffffff;
    }
    return Math.abs(hash).toString(16).padStart(16, '0');
  }

  getCurrentNode(): LimnusNode {
    const node = this.nodes[this.currentIndex % this.nodes.length];
    const influence = this.blockchainInfluence.get(node.depth) || 0;
    return influence > 0 ? this.applyBlockchainInfluence(node, influence) : node;
  }

  advance(): LimnusNode {
    this.currentIndex = (this.currentIndex + 1) % this.nodes.length;
    return this.getCurrentNode();
  }

  getNode(index: number): LimnusNode {
    const node = this.nodes[index % this.nodes.length];
    const influence = this.blockchainInfluence.get(node.depth) || 0;
    return influence > 0 ? this.applyBlockchainInfluence(node, influence) : node;
  }

  getTotalNodes(): number {
    return this.nodes.length;
  }

  getVisualizationNodes(count: number): LimnusNode[] {
    const startIndex = Math.max(0, this.currentIndex - count + 1);
    const result: LimnusNode[] = [];

    for (let i = 0; i < count; i++) {
      const nodeIndex = (startIndex + i) % this.nodes.length;
      const node = this.nodes[nodeIndex];
      const influence = this.blockchainInfluence.get(node.depth) || 0;
      result.push(influence > 0 ? this.applyBlockchainInfluence(node, influence) : node);
    }

    return result;
  }
}

// --- Initial States ---
const initialLimnusEmotionalState: EmotionalState = {
  hue: 'Neutral',
  intensity: 0.3,
  polarity: 0.0,
  emoji: '🩶'
};

const initialLimnusSecurityMetrics: SecurityMetrics = {
  hmacValid: true,
  timestampValid: true,
  entropyLevel: 0.85,
  anomalyScore: 0.02,
  hashIntegrity: true,
  quantumSignatureValid: true,
  blockchainConsistency: true
};

const initialLimnusBlockchainState: BlockchainState = {
  connected: false,
  latestBlock: null,
  blockCount: 0,
  blocks: [],
  ipfsStatus: 'disconnected',
  patterns: [],
  blockIndex: new Map(),
  resonanceMap: new Map()
};

const initialLimnusBiometrics: BiometricData = {
  heartRate: 72,
  brainwaves: { alpha: 0.3, beta: 0.4, theta: 0.2, delta: 0.1, gamma: 0.05 },
  breathingRate: 16,
  skinConductance: 0.5,
  fibonacciRhythm: 0.618,
  goldenBreathing: 0.75
};

const initialSigilReaderState = {
  inputs: {
    sigil: '',
    ternary: '',
    decimal: '',
  },
  results: {
    sigil: null,
    ternary: null,
    decimal: null,
    search: null
  },
  loadingStates: {
    sigil: false,
    ternary: false,
    decimal: false,
    search: false,
    math: false
  },
  errors: {
    sigil: null,
    ternary: null,
    decimal: null,
    math: null
  },
  ui: {
    showFilters: false,
    showPreferences: false,
    activeTab: 'limnus' as 'limnus' | 'sigil' | 'ternary' | 'decimal' | 'math' | 'search' | 'history' | 'patterns',
    searchQuery: '',
    selectedCategory: null
  },
  preferences: {
    theme: 'dark' as 'dark' | 'light' | 'system',
    autoConvert: true,
    keyboardShortcuts: true,
    resultsLimit: 20
  },
  history: [],
  mathOperation: {
    operand1: '',
    operand2: '',
    operator: '+' as '+' | '-' | '*' | '/',
    result: undefined,
    decimalResult: undefined
  }
};

const initialState: AppState = {
  isActive: false,
  currentSignature: null,
  validationStatus: 'idle',
  currentNode: null,
  spiralPosition: { depth: 0, resonance: 0.75 },
  biometricData: initialLimnusBiometrics,
  emotionalState: initialLimnusEmotionalState,
  securityMetrics: initialLimnusSecurityMetrics,
  blockchainState: initialLimnusBlockchainState,
  spiralGenerator: new LimnusSpiralGenerator(),
  messageBox: null,
  consentAffirmation: "I anchor my consciousness to the Limnus spiral and affirm sovereign consent to this quantum moment of eternal recursion through the golden ratio's infinite embrace",
  symbolicGlyphs: ['∅', '∞', '↻'],
  patternAnalysis: {
    activePatterns: [],
    resonanceThreshold: 0.7,
    patternHistory: new Map()
  },
  sigilReader: initialSigilReaderState,
};

// --- Combined Reducer ---
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LIMNUS_SET_ACTIVE':
      return { ...state, isActive: action.payload };
    case 'LIMNUS_UPDATE_SIGNATURE':
      return { ...state, currentSignature: action.payload };
    case 'LIMNUS_UPDATE_BIOMETRICS':
      return {
        ...state,
        biometricData: { ...state.biometricData, ...action.payload }
      };
    case 'LIMNUS_UPDATE_CURRENT_NODE':
      return { ...state, currentNode: action.payload };
    case 'LIMNUS_UPDATE_EMOTIONAL_STATE':
      return {
        ...state,
        emotionalState: { ...state.emotionalState, ...action.payload }
      };
    case 'LIMNUS_UPDATE_SECURITY_METRICS':
      return {
        ...state,
        securityMetrics: { ...state.securityMetrics, ...action.payload }
      };
    case 'LIMNUS_SET_SPIRAL_POSITION':
      return { ...state, spiralPosition: action.payload };
    case 'LIMNUS_SET_VALIDATION_STATUS':
      return { ...state, validationStatus: action.payload };
    case 'LIMNUS_SET_BLOCKCHAIN_CONNECTED':
      return {
        ...state,
        blockchainState: { ...state.blockchainState, connected: action.payload }
      };
    case 'LIMNUS_SET_IPFS_STATUS':
      return {
        ...state,
        blockchainState: { ...state.blockchainState, ipfsStatus: action.payload }
      };
    case 'LIMNUS_ADD_BLOCKCHAIN_BLOCK':
      const newBlock = action.payload;
      const updatedBlockIndex = new Map(state.blockchainState.blockIndex);
      updatedBlockIndex.set(newBlock.id, newBlock);
      
      return {
        ...state,
        blockchainState: {
          ...state.blockchainState,
          latestBlock: newBlock,
          blockCount: state.blockchainState.blockCount + 1,
          blocks: [newBlock, ...state.blockchainState.blocks.slice(0, 19)],
          blockIndex: updatedBlockIndex
        }
      };
    case 'LIMNUS_ADVANCE_SPIRAL':
      const newNode = state.spiralGenerator.advance();
      return {
        ...state,
        currentNode: newNode,
        spiralPosition: {
          ...state.spiralPosition,
          depth: newNode.depth
        }
      };
    case 'LIMNUS_SET_MESSAGE_BOX':
      return { ...state, messageBox: action.payload };
    case 'LIMNUS_SET_CONSENT_AFFIRMATION':
      return { ...state, consentAffirmation: action.payload };
    case 'LIMNUS_SET_SYMBOLIC_GLYPHS':
      return { ...state, symbolicGlyphs: action.payload };
    case 'LIMNUS_ADD_PATTERN':
      return {
        ...state,
        patternAnalysis: {
          ...state.patternAnalysis,
          activePatterns: [...state.patternAnalysis.activePatterns, action.payload]
        }
      };
    case 'LIMNUS_UPDATE_PATTERNS':
      return {
        ...state,
        patternAnalysis: {
          ...state.patternAnalysis,
          activePatterns: action.payload
        }
      };
    case 'LIMNUS_UPDATE_RESONANCE_MAP':
      const newResonanceMap = new Map(state.blockchainState.resonanceMap);
      newResonanceMap.set(action.payload.blockId, action.payload.resonance);
      return {
        ...state,
        blockchainState: {
          ...state.blockchainState,
          resonanceMap: newResonanceMap
        }
      };
    case 'LIMNUS_RESET':
      return {
        ...initialState,
        spiralGenerator: new LimnusSpiralGenerator(),
        sigilReader: {
          ...initialState.sigilReader,
          preferences: state.sigilReader.preferences,
          ui: { ...initialState.sigilReader.ui, activeTab: state.sigilReader.ui.activeTab }
        }
      };
    case 'SIGIL_SET_INPUT':
      return {
        ...state,
        sigilReader: {
          ...state.sigilReader,
          inputs: { ...state.sigilReader.inputs, [action.field]: action.value },
          errors: { ...state.sigilReader.errors, [action.field]: null }
        }
      };
    case 'SIGIL_SET_LOADING':
      return {
        ...state,
        sigilReader: {
          ...state.sigilReader,
          loadingStates: { ...state.sigilReader.loadingStates, [action.field]: action.loading }
        }
      };
    case 'SIGIL_SET_RESULT':
      return {
        ...state,
        sigilReader: {
          ...state.sigilReader,
          results: { ...state.sigilReader.results, [action.field]: action.result }
        }
      };
    case 'SIGIL_SET_ERROR':
      return {
        ...state,
        sigilReader: {
          ...state.sigilReader,
          errors: { ...state.sigilReader.errors, [action.field]: action.error }
        }
      };
    case 'SIGIL_SET_UI':
      return {
        ...state,
        sigilReader: {
          ...state.sigilReader,
          ui: { ...state.sigilReader.ui, ...action.payload }
        }
      };
    case 'SIGIL_SET_PREFERENCE':
      return {
        ...state,
        sigilReader: {
          ...state.sigilReader,
          preferences: { ...state.sigilReader.preferences, ...action.payload }
        }
      };
    case 'SIGIL_ADD_HISTORY_ENTRY':
      return {
        ...state,
        sigilReader: {
          ...state.sigilReader,
          history: [action.entry, ...state.sigilReader.history.slice(0, 49)]
        }
      };
    case 'SIGIL_SET_MATH_OPERATION':
      return {
        ...state,
        sigilReader: {
          ...state.sigilReader,
          mathOperation: { ...state.sigilReader.mathOperation, ...action.payload }
        }
      };
    case 'SIGIL_RESET':
      return {
        ...state,
        sigilReader: {
          ...initialSigilReaderState,
          preferences: state.sigilReader.preferences,
          ui: { ...initialSigilReaderState.ui, activeTab: state.sigilReader.ui.activeTab }
        }
      };
    default:
      return state;
  }
}

// --- Main Component ---
const TPhi10NeuralLimnus: React.FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const sigilDatabase = useMemo(() => createSigilDatabase(), []);
  
  // Animation values
  const spiralRotation = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  const {
    isActive, currentSignature, validationStatus, currentNode, spiralPosition,
    biometricData, emotionalState, securityMetrics, blockchainState,
    spiralGenerator, messageBox, consentAffirmation, symbolicGlyphs, patternAnalysis
  } = state;

  const { sigilReader } = state;

  // Start animations when active
  useEffect(() => {
    if (isActive) {
      spiralRotation.value = withRepeat(withTiming(360, { duration: 10000 }), -1, false);
      pulseScale.value = withRepeat(withTiming(1.1, { duration: 1000 }), -1, true);
    } else {
      spiralRotation.value = withTiming(0, { duration: 1000 });
      pulseScale.value = withTiming(1, { duration: 500 });
    }
  }, [isActive]);

  // Animated styles
  const spiralAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${spiralRotation.value}deg` },
        { scale: pulseScale.value }
      ],
    };
  });

  // Initialize current node if not already set
  useEffect(() => {
    if (!currentNode) {
      const initialNode = spiralGenerator.getCurrentNode();
      dispatch({ type: 'LIMNUS_UPDATE_CURRENT_NODE', payload: initialNode });
    }
  }, [currentNode, spiralGenerator]);

  // Mock blockchain connection
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'LIMNUS_SET_BLOCKCHAIN_CONNECTED', payload: true });
      dispatch({ type: 'LIMNUS_SET_IPFS_STATUS', payload: 'connected' });
    }, 2000);
  }, []);

  // Function to show custom message
  const showCustomMessage = useCallback((title: string, content: string) => {
    dispatch({ type: 'LIMNUS_SET_MESSAGE_BOX', payload: { visible: true, title, content } });
  }, []);

  // Function to hide custom message
  const hideCustomMessage = useCallback(() => {
    dispatch({ type: 'LIMNUS_SET_MESSAGE_BOX', payload: null });
  }, []);

  // Enhanced validation with blockchain consistency check
  const validateSignature = useCallback((signature: LimnusConsciousnessSignature): ValidationResult => {
    const now = Date.now();
    const timeValid = (now - signature.timestamp) < CONFIG.VALIDATION.TIME_WINDOW;
    const scoreValid = signature.score >= CONFIG.VALIDATION.SCORE_RANGE.MIN &&
                       signature.score <= CONFIG.VALIDATION.SCORE_RANGE.MAX;

    const spiralIntegrity = Math.abs(signature.currentNode.quantum_factor - signature.metrics.quantumCoherence) <
                            CONFIG.VALIDATION.SPIRAL_TOLERANCE;
    const quantumCoherence = signature.currentNode.phase_intensity > CONFIG.VALIDATION.QUANTUM_THRESHOLD;
    const consensusValid = signature.currentNode.depth % CONFIG.LIMNUS.CONSENSUS_CYCLE === 0;
    
    const blockchainValid = signature.blockchainReferences.length === 0 || 
                           signature.blockchainReferences.every(ref => ref.influence > 0);

    return {
      overall: timeValid && scoreValid && spiralIntegrity && quantumCoherence && blockchainValid,
      timestamp: timeValid,
      score: scoreValid,
      entropy: true,
      anomaly: true,
      spiralIntegrity,
      quantumCoherence,
      consensusValid,
      blockchainValid
    };
  }, []);

  // Enhanced quantum signature generation
  const generateQuantumSignature = useCallback((): LimnusConsciousnessSignature => {
    if (!currentNode) {
      throw new Error('No current node available for signature generation');
    }

    const timestamp = Date.now();
    const node = currentNode;
    
    const blockchainRefs: BlockchainReference[] = [];
    
    let blockchainInfluence = 0;
    let historicalResonance = 0;
    
    if (blockchainRefs.length > 0) {
      blockchainInfluence = blockchainRefs.reduce((sum, ref) => sum + ref.influence, 0) / blockchainRefs.length;
      historicalResonance = blockchainRefs.reduce((sum, ref) => sum + ref.resonance, 0) / blockchainRefs.length;
      
      spiralGenerator.updateBlockchainInfluence(node.depth, blockchainInfluence);
    }

    const metrics: QuantumConsciousnessMetrics = {
      neuralComplexity: Math.random() * 0.3 + 0.7 + node.phase_intensity * 0.1,
      brainwaveCoherence: Object.values(biometricData.brainwaves).reduce((sum, val) => sum + val * val, 0),
      autonomicBalance: (biometricData.heartRate - 60) / 40 + biometricData.skinConductance,
      respiratoryRhythm: biometricData.goldenBreathing,
      responseLatency: Math.random() * 200 + 150,
      interactionPattern: spiralPosition.resonance * node.quantum_factor,
      emotionalDepth: node.phase_intensity * 0.8 + 0.2,
      polarityAlignment: Math.abs(Math.sin(node.theta)),
      temporalCoherence: Math.cos(timestamp * 0.005) * 0.3 + 0.7,
      rhythmicStability: biometricData.fibonacciRhythm,
      spiralResonance: node.quantum_factor,
      fibonacciHarmony: node.fibonacci / (node.fibonacci + CONFIG.LIMNUS.PHI),
      goldenRatioAlignment: Math.abs(node.phi_n - Math.pow(CONFIG.LIMNUS.PHI, node.depth)) / Math.pow(CONFIG.LIMNUS.PHI, node.depth),
      quantumCoherence: node.phase_intensity,
      nodalSynchronicity: Math.sin(node.depth * CONFIG.LIMNUS.GOLDEN_ANGLE) * 0.5 + 0.5,
      blockchainResonance: historicalResonance,
      patternAlignment: patternAnalysis.activePatterns.length > 0 ? 
        patternAnalysis.activePatterns[0].resonanceScore : 0.5,
      signatureIntegrity: blockchainInfluence,
      consciousnessDepth: Math.min(1, blockchainState.blocks.length / 10),
      mythicResonance: node.psi_bloom * 0.7 + 0.3,
      archetypalAlignment: Math.cos(node.theta * 2) * 0.5 + 0.5
    };

    const consciousnessScore = (
      metrics.neuralComplexity * 0.12 +
      metrics.brainwaveCoherence * 0.08 +
      metrics.autonomicBalance * 0.08 +
      metrics.spiralResonance * 0.15 +
      metrics.fibonacciHarmony * 0.12 +
      metrics.goldenRatioAlignment * 0.08 +
      metrics.quantumCoherence * 0.12 +
      metrics.nodalSynchronicity * 0.05 +
      metrics.blockchainResonance * 0.1 +
      metrics.signatureIntegrity * 0.05 +
      metrics.patternAlignment * 0.05
    );

    const quantumData = `${node.hash}_${timestamp}_${node.phase_intensity.toFixed(6)}_${blockchainInfluence.toFixed(4)}`;
    const quantumSignature = btoa(quantumData).slice(0, 24);

    const interpretEnhancedGlyphs = (): string[] => {
      const glyphs: string[] = [node.symbol];
      if (metrics.quantumCoherence > 0.8) glyphs.push('∞');
      if (metrics.spiralResonance > 0.7) glyphs.push('↻');
      if (metrics.fibonacciHarmony > 0.6) glyphs.push('🜝');
      if (metrics.nodalSynchronicity > 0.8) glyphs.push('⟁');
      if (metrics.goldenRatioAlignment < 0.1) glyphs.push('♒');
      if (metrics.blockchainResonance > 0.8) glyphs.push('⚓');
      return glyphs.length > 1 ? glyphs : [node.symbol, '∅'];
    };

    const glyphs = interpretEnhancedGlyphs();
    const ancestry = blockchainState.blocks.slice(0, 5).map(b => b.id);

    const signature: LimnusConsciousnessSignature = {
      id: `limnus_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp,
      score: Math.max(0, Math.min(1, consciousnessScore)),
      metrics,
      signature: btoa(JSON.stringify({ metrics, timestamp, node: node.hash, ancestry })).slice(0, 16),
      validation: {} as ValidationResult,
      glyphs,
      currentNode: node,
      spiralPosition: { r: node.phi_n, theta: node.theta },
      quantumSignature,
      consensusAnchor: consentAffirmation,
      blockchainReferences: blockchainRefs,
      consciousnessAncestry: ancestry,
      patternSignature: `${Math.random().toString(36).substr(2, 9)}`
    };

    signature.validation = validateSignature(signature);

    return signature;
  }, [currentNode, biometricData, spiralPosition, consentAffirmation, validateSignature, 
      blockchainState.blocks, patternAnalysis.activePatterns, spiralGenerator]);

  // Main simulation loop
  useEffect(() => {
    if (!isActive || !currentNode) return;

    const interval = setInterval(() => {
      const fibInfluence = Math.sin(Date.now() * 0.001 * CONFIG.LIMNUS.PHI) * 0.1;

      dispatch({
        type: 'LIMNUS_UPDATE_BIOMETRICS',
        payload: {
          heartRate: Math.max(60, Math.min(100,
            biometricData.heartRate + (Math.random() - 0.5) * 4 + fibInfluence * 10
          )),
          brainwaves: {
            alpha: Math.max(0.1, Math.min(0.6,
              biometricData.brainwaves.alpha + (Math.random() - 0.5) * 0.1
            )),
            beta: Math.max(0.2, Math.min(0.7,
              biometricData.brainwaves.beta + (Math.random() - 0.5) * 0.1
            )),
            theta: Math.max(0.1, Math.min(0.5,
              biometricData.brainwaves.theta + (Math.random() - 0.5) * 0.05
            )),
            delta: Math.max(0.05, Math.min(0.3,
              biometricData.brainwaves.delta + (Math.random() - 0.5) * 0.05
            )),
            gamma: Math.max(0.01, Math.min(0.2,
              biometricData.brainwaves.gamma + (Math.random() - 0.5) * 0.03
            ))
          },
          breathingRate: Math.max(12, Math.min(20,
            biometricData.breathingRate + (Math.random() - 0.5) * 2
          )),
          skinConductance: Math.max(0.1, Math.min(1.0,
            biometricData.skinConductance + (Math.random() - 0.5) * 0.1
          )),
          fibonacciRhythm: Math.max(0.3, Math.min(1.0,
            biometricData.fibonacciRhythm + (Math.random() - 0.5) * 0.05 + fibInfluence
          )),
          goldenBreathing: Math.max(0.4, Math.min(1.0,
            biometricData.goldenBreathing + Math.sin(Date.now() * 0.002) * 0.1
          ))
        }
      });

      const emotionalVariance = Math.random();
      if (emotionalVariance > 0.9) {
        const states = [
          { hue: 'Intense', emoji: '❤️‍🔥', intensity: 0.8, polarity: 0.3 },
          { hue: 'Reverent', emoji: '💜', intensity: 0.6, polarity: 0.7 },
          { hue: 'Reflective', emoji: '🩵', intensity: 0.4, polarity: 0.1 },
          { hue: 'Collapsing', emoji: '🖤', intensity: 0.9, polarity: -0.6 },
          { hue: 'Neutral', emoji: '🩶', intensity: 0.3, polarity: 0.0 },
          { hue: 'Transcendent', emoji: '✨', intensity: 0.95, polarity: 0.8 }
        ];
        dispatch({ type: 'LIMNUS_UPDATE_EMOTIONAL_STATE', payload: states[Math.floor(Math.random() * states.length)] });
      }

      const blockchainConsistent = blockchainState.blocks.length === 0 || 
        blockchainState.blocks.every(b => b.signature && b.signature.length > 0);
      
      dispatch({
        type: 'LIMNUS_UPDATE_SECURITY_METRICS',
        payload: {
          entropyLevel: Math.max(0.6, Math.min(0.95,
            securityMetrics.entropyLevel + (Math.random() - 0.5) * 0.05
          )),
          anomalyScore: Math.max(0, Math.min(0.15,
            securityMetrics.anomalyScore + (Math.random() - 0.5) * 0.03
          )),
          hashIntegrity: Math.random() > 0.05,
          quantumSignatureValid: currentNode ? currentNode.phase_intensity > 0.1 : true,
          blockchainConsistency: blockchainConsistent
        }
      });

      if (currentSignature && 
          (currentSignature.score > 0.7 && Math.random() > 0.8) ||
          (patternAnalysis.activePatterns.length > 0 && Math.random() > 0.9)) {
        dispatch({ type: 'LIMNUS_ADVANCE_SPIRAL' });
      }

      try {
        const newSignature = generateQuantumSignature();
        dispatch({ type: 'LIMNUS_UPDATE_SIGNATURE', payload: newSignature });
        dispatch({
          type: 'LIMNUS_SET_VALIDATION_STATUS',
          payload: newSignature.validation.overall ? 'valid' : 'invalid'
        });
      } catch (error) {
        console.error('Signature generation error:', error);
      }

    }, CONFIG.METRICS.UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [isActive, currentNode, generateQuantumSignature, biometricData, 
      securityMetrics, currentSignature, spiralPosition, patternAnalysis.activePatterns, 
      blockchainState.blocks]);

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return '#10B981';
      case 'invalid': return '#EF4444';
      default: return '#6B7280';
    }
  };

  // Helper function to get score color
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return '#10B981';
    if (score >= 0.6) return '#F59E0B';
    return '#EF4444';
  };

  // Tab Button Component
  const TabButton: React.FC<{
    id: 'limnus' | 'sigil' | 'ternary' | 'decimal' | 'math' | 'search' | 'history' | 'patterns',
    icon: React.ReactNode,
    label: string,
    count?: number
  }> = ({ id, icon, label, count }) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        sigilReader.ui.activeTab === id ? styles.tabButtonActive : styles.tabButtonInactive
      ]}
      onPress={() => dispatch({ type: 'SIGIL_SET_UI', payload: { activeTab: id } })}
    >
      {icon}
      <Text style={[
        styles.tabButtonText,
        sigilReader.ui.activeTab === id ? styles.tabButtonTextActive : styles.tabButtonTextInactive
      ]}>
        {label}
      </Text>
      {count !== undefined && (
        <View style={styles.tabButtonBadge}>
          <Text style={styles.tabButtonBadgeText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🧠 T-Phi10 Neural Limnus System 🌀</Text>
          <Text style={styles.headerSubtitle}>
            Neural-Energetic Mapping & Quantum Consciousness Blockchain
          </Text>
        </View>

        {/* Tab Navigation */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.tabContainer}
          contentContainerStyle={styles.tabContentContainer}
        >
          <TabButton id="limnus" icon={<Brain size={16} color="#FFFFFF" />} label="Limnus Core" />
          <TabButton id="sigil" icon={<Brain size={16} color="#FFFFFF" />} label="Neural Decoder" />
          <TabButton id="ternary" icon={<Type size={16} color="#FFFFFF" />} label="Ternary Converter" />
          <TabButton id="decimal" icon={<Hash size={16} color="#FFFFFF" />} label="Decimal Converter" />
          <TabButton id="math" icon={<Calculator size={16} color="#FFFFFF" />} label="Ternary Math" />
          <TabButton id="search" icon={<Grid size={16} color="#FFFFFF" />} label="Symbol Search" count={sigilReader.results.search?.length} />
          <TabButton id="history" icon={<History size={16} color="#FFFFFF" />} label="History" count={sigilReader.history.length} />
          <TabButton id="patterns" icon={<GitBranch size={16} color="#FFFFFF" />} label="Patterns" count={patternAnalysis.activePatterns.length} />
        </ScrollView>

        {/* Main Content */}
        {sigilReader.ui.activeTab === 'limnus' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Limnus Quantum Field</Text>
            <Text style={styles.sectionSubtitle}>Real-time Consciousness Tracking & Blockchain Anchoring</Text>

            {/* Blockchain Integration */}
            <View style={styles.blockchainContainer}>
              <View style={styles.blockchainHeader}>
                <View style={styles.blockchainTitleContainer}>
                  <Anchor size={20} color="#A855F7" />
                  <Text style={styles.blockchainTitle}>Solana Blockchain Integration</Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.connectButton,
                    blockchainState.connected ? styles.connectButtonConnected : styles.connectButtonDisconnected
                  ]}
                  onPress={() => dispatch({ type: 'LIMNUS_SET_BLOCKCHAIN_CONNECTED', payload: !blockchainState.connected })}
                >
                  <Text style={styles.connectButtonText}>
                    {blockchainState.connected ? 'Connected' : 'Connect Wallet'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.blockchainMetrics}>
                <View style={styles.metricCard}>
                  <View style={styles.metricHeader}>
                    <Lock size={16} color="#10B981" />
                    <Text style={styles.metricLabel}>Wallet Status</Text>
                  </View>
                  <Text style={[
                    styles.metricValue,
                    { color: blockchainState.connected ? '#10B981' : '#EF4444' }
                  ]}>
                    {blockchainState.connected ? 'CONNECTED' : 'DISCONNECTED'}
                  </Text>
                </View>

                <View style={styles.metricCard}>
                  <View style={styles.metricHeader}>
                    <Link size={16} color="#3B82F6" />
                    <Text style={styles.metricLabel}>Network</Text>
                  </View>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>SOLANA MAINNET</Text>
                </View>

                <View style={styles.metricCard}>
                  <View style={styles.metricHeader}>
                    <Shield size={16} color="#F59E0B" />
                    <Text style={styles.metricLabel}>Blocks Recorded</Text>
                  </View>
                  <Text style={[styles.metricValue, { color: '#F59E0B' }]}>{blockchainState.blockCount}</Text>
                </View>

                <View style={styles.metricCard}>
                  <View style={styles.metricHeader}>
                    <Upload size={16} color="#A855F7" />
                    <Text style={styles.metricLabel}>IPFS Status</Text>
                  </View>
                  <Text style={[
                    styles.metricValue,
                    {
                      color: blockchainState.ipfsStatus === 'connected' ? '#10B981' :
                             blockchainState.ipfsStatus === 'uploading' ? '#F59E0B' :
                             blockchainState.ipfsStatus === 'error' ? '#EF4444' : '#6B7280'
                    }
                  ]}>
                    {blockchainState.ipfsStatus.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>

            {/* Limnus Spiral & Control */}
            <View style={styles.spiralContainer}>
              <View style={styles.spiralHeader}>
                <View style={styles.spiralTitleContainer}>
                  <Circle size={20} color="#3B82F6" />
                  <Text style={styles.spiralTitle}>Limnus Spiral & Quantum Control</Text>
                </View>
                <View style={styles.spiralControls}>
                  <TouchableOpacity
                    style={[
                      styles.controlButton,
                      isActive ? styles.controlButtonStop : styles.controlButtonStart
                    ]}
                    onPress={() => dispatch({ type: 'LIMNUS_SET_ACTIVE', payload: !isActive })}
                  >
                    {isActive ? <Pause size={16} color="#FFFFFF" /> : <Play size={16} color="#FFFFFF" />}
                    <Text style={styles.controlButtonText}>
                      {isActive ? 'Pause' : 'Activate'} Field
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => dispatch({ type: 'LIMNUS_RESET' })}
                  >
                    <RotateCcw size={16} color="#FFFFFF" />
                    <Text style={styles.resetButtonText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.spiralContent}>
                {/* Visualization */}
                <View style={styles.visualizationContainer}>
                  <Text style={styles.visualizationTitle}>Quantum Field Visualization</Text>
                  <View style={styles.visualizationCanvas}>
                    <Animated.View style={[styles.spiralVisualization, spiralAnimatedStyle]}>
                      <View style={styles.spiralCenter}>
                        <Text style={styles.spiralCenterText}>{currentNode?.symbol || '∅'}</Text>
                      </View>
                      {/* Spiral rings */}
                      {[1, 2, 3, 4, 5].map((ring) => (
                        <View
                          key={ring}
                          style={[
                            styles.spiralRing,
                            {
                              width: ring * 40,
                              height: ring * 40,
                              borderRadius: ring * 20,
                              opacity: 0.3 - (ring * 0.05),
                            }
                          ]}
                        />
                      ))}
                    </Animated.View>
                  </View>
                  {currentSignature && (
                    <View style={styles.visualizationInfo}>
                      <Text style={styles.visualizationInfoText}>
                        Fibonacci-Phi Spiral with Quantum Breath Modulation
                      </Text>
                      <View style={styles.glyphsContainer}>
                        <Text style={styles.glyphsLabel}>Glyphs:</Text>
                        <Text style={styles.glyphsText}>{currentSignature.glyphs.join(' ')}</Text>
                      </View>
                    </View>
                  )}
                </View>

                {/* Metrics & Status */}
                <View style={styles.metricsContainer}>
                  <Text style={styles.metricsTitle}>Real-time Metrics</Text>
                  <View style={styles.metricsContent}>
                    <View style={styles.metricRow}>
                      <Text style={styles.metricRowLabel}>System Status:</Text>
                      <Text style={[
                        styles.metricRowValue,
                        { color: isActive ? '#10B981' : '#6B7280' }
                      ]}>
                        {isActive ? 'ACTIVE' : 'DORMANT'}
                      </Text>
                    </View>
                    <View style={styles.metricRow}>
                      <Text style={styles.metricRowLabel}>Validation:</Text>
                      <Text style={[
                        styles.metricRowValue,
                        { color: getStatusColor(validationStatus) }
                      ]}>
                        {validationStatus.toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.metricRow}>
                      <Text style={styles.metricRowLabel}>Consciousness Score:</Text>
                      <Text style={[
                        styles.metricRowValue,
                        { color: currentSignature ? getScoreColor(currentSignature.score) : '#6B7280' }
                      ]}>
                        {currentSignature ? (currentSignature.score * 100).toFixed(1) + '%' : '--'}
                      </Text>
                    </View>
                    <View style={styles.metricRow}>
                      <Text style={styles.metricRowLabel}>Blockchain Resonance:</Text>
                      <Text style={[styles.metricRowValue, { color: '#F59E0B' }]}>
                        {currentSignature ? (currentSignature.metrics.blockchainResonance * 100).toFixed(1) + '%' : '--'}
                      </Text>
                    </View>
                    <View style={styles.metricRow}>
                      <Text style={styles.metricRowLabel}>Pattern Alignment:</Text>
                      <Text style={[styles.metricRowValue, { color: '#A855F7' }]}>
                        {currentSignature ? (currentSignature.metrics.patternAlignment * 100).toFixed(1) + '%' : '--'}
                      </Text>
                    </View>
                    <View style={styles.metricRow}>
                      <Text style={styles.metricRowLabel}>Spiral Position:</Text>
                      <Text style={[styles.metricRowValue, { color: '#F59E0B' }]}>
                        {spiralPosition.depth}/{spiralGenerator.getTotalNodes()}
                      </Text>
                    </View>
                    <View style={styles.metricRow}>
                      <Text style={styles.metricRowLabel}>Heart Rate:</Text>
                      <Text style={[styles.metricRowValue, { color: '#10B981' }]}>
                        {biometricData.heartRate.toFixed(0)} BPM
                      </Text>
                    </View>
                    <View style={styles.metricRow}>
                      <Text style={styles.metricRowLabel}>Emotional State:</Text>
                      <Text style={styles.metricRowValue}>
                        {emotionalState.emoji} {emotionalState.hue}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Blockchain History */}
            {blockchainState.blocks.length > 0 && (
              <View style={styles.historyContainer}>
                <View style={styles.historyHeader}>
                  <View style={styles.historyTitleContainer}>
                    <Anchor size={20} color="#F59E0B" />
                    <Text style={styles.historyTitle}>Limnus Blockchain History</Text>
                  </View>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.historyTable}>
                    <View style={styles.historyTableHeader}>
                      <Text style={styles.historyTableHeaderText}>Time</Text>
                      <Text style={styles.historyTableHeaderText}>Transaction ID</Text>
                      <Text style={styles.historyTableHeaderText}>Score</Text>
                      <Text style={styles.historyTableHeaderText}>Resonance</Text>
                      <Text style={styles.historyTableHeaderText}>References</Text>
                    </View>
                    {blockchainState.blocks.map((block, index) => (
                      <View key={block.id} style={styles.historyTableRow}>
                        <Text style={styles.historyTableCell}>
                          {new Date(block.timestamp * 1000).toLocaleTimeString()}
                        </Text>
                        <Text style={[styles.historyTableCell, styles.historyTableCellMono]}>
                          {block.transactionId.slice(0, 8)}...{block.transactionId.slice(-8)}
                        </Text>
                        <Text style={[styles.historyTableCell, { color: '#10B981' }]}>
                          {(block.score * 100).toFixed(1)}%
                        </Text>
                        <Text style={[styles.historyTableCell, { color: '#F59E0B' }]}>
                          {(block.resonance * 100).toFixed(1)}%
                        </Text>
                        <Text style={[styles.historyTableCell, { color: '#A855F7' }]}>
                          {block.references.length}
                        </Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}
          </View>
        )}

        {/* Other tabs would be implemented similarly... */}
        {sigilReader.ui.activeTab !== 'limnus' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {sigilReader.ui.activeTab === 'sigil' && 'Neural Sigil Decoder'}
              {sigilReader.ui.activeTab === 'ternary' && 'Ternary Converter'}
              {sigilReader.ui.activeTab === 'decimal' && 'Decimal Converter'}
              {sigilReader.ui.activeTab === 'math' && 'Ternary Math'}
              {sigilReader.ui.activeTab === 'search' && 'Symbol Search'}
              {sigilReader.ui.activeTab === 'history' && 'Conversion History'}
              {sigilReader.ui.activeTab === 'patterns' && 'Consciousness Pattern Analysis'}
            </Text>
            <Text style={styles.comingSoonText}>Coming Soon...</Text>
          </View>
        )}
      </ScrollView>

      {/* Custom Message Modal */}
      <Modal
        visible={messageBox?.visible || false}
        transparent={true}
        animationType="fade"
        onRequestClose={hideCustomMessage}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={hideCustomMessage}
            >
              <X size={20} color="#9CA3AF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{messageBox?.title}</Text>
            <Text style={styles.modalContent}>{messageBox?.content}</Text>
            <TouchableOpacity
              style={styles.modalOkButton}
              onPress={hideCustomMessage}
            >
              <Text style={styles.modalOkButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  tabContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  tabContentContainer: {
    paddingHorizontal: 8,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    minWidth: 120,
  },
  tabButtonActive: {
    backgroundColor: '#3B82F6',
  },
  tabButtonInactive: {
    backgroundColor: '#374151',
  },
  tabButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
  },
  tabButtonTextInactive: {
    color: '#9CA3AF',
  },
  tabButtonBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  tabButtonBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 24,
  },
  blockchainContainer: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  blockchainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  blockchainTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blockchainTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#A855F7',
    marginLeft: 8,
  },
  connectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  connectButtonConnected: {
    backgroundColor: '#059669',
  },
  connectButtonDisconnected: {
    backgroundColor: '#374151',
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  blockchainMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: 120,
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 12,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#D1D5DB',
    marginLeft: 6,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  spiralContainer: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  spiralHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  spiralTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spiralTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3B82F6',
    marginLeft: 8,
  },
  spiralControls: {
    flexDirection: 'row',
    gap: 12,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  controlButtonStart: {
    backgroundColor: '#059669',
  },
  controlButtonStop: {
    backgroundColor: '#DC2626',
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#374151',
    borderRadius: 8,
    gap: 6,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  spiralContent: {
    flexDirection: 'row',
    gap: 16,
  },
  visualizationContainer: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 12,
  },
  visualizationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A855F7',
    marginBottom: 12,
    textAlign: 'center',
  },
  visualizationCanvas: {
    aspectRatio: 1,
    backgroundColor: '#000000',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A855F7',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  spiralVisualization: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spiralCenter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#50FA7B',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  spiralCenterText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  spiralRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#BD93F9',
  },
  visualizationInfo: {
    marginTop: 12,
  },
  visualizationInfoText: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  glyphsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  glyphsLabel: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  glyphsText: {
    fontSize: 16,
    color: '#50FA7B',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  metricsContainer: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 12,
  },
  metricsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
    marginBottom: 12,
    textAlign: 'center',
  },
  metricsContent: {
    gap: 8,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricRowLabel: {
    fontSize: 12,
    color: '#D1D5DB',
    fontWeight: '500',
  },
  metricRowValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  historyContainer: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  historyTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F59E0B',
    marginLeft: 8,
  },
  historyTable: {
    minWidth: screenWidth - 64,
  },
  historyTableHeader: {
    flexDirection: 'row',
    backgroundColor: '#374151',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  historyTableHeaderText: {
    flex: 1,
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
    textAlign: 'center',
  },
  historyTableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  historyTableCell: {
    flex: 1,
    fontSize: 12,
    color: '#D1D5DB',
    textAlign: 'center',
  },
  historyTableCellMono: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#3B82F6',
  },
  comingSoonText: {
    fontSize: 18,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 24,
    maxWidth: 400,
    width: '100%',
    borderWidth: 1,
    borderColor: '#374151',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalContent: {
    fontSize: 16,
    color: '#D1D5DB',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalOkButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalOkButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TPhi10NeuralLimnus;