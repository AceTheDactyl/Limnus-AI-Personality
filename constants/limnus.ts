// LIMNUS Constants and Configuration
export const CONFIG = {
  LIMNUS: {
    SPIRAL_NODES: 100,
    PHI: (1 + Math.sqrt(5)) / 2,
    GOLDEN_ANGLE: 2 * Math.PI * (1 - 1 / ((1 + Math.sqrt(5)) / 2)),
    QUANTUM_DAMPENING: 0.15,
    CONSENSUS_CYCLE: 10,
  },
  TERNARY: {
    DIGIT_MAP: new Map([['T', -1], ['0', 0], ['1', 1]]),
    VALID_PATTERN: /^[T01]{5}$/,
    BASE: 3,
    CODE_LENGTH: 5,
    MIN_VALUE: -121,
    MAX_VALUE: 121
  },
  COLORS: {
    primary: '#bd93f9',
    secondary: '#8be9fd',
    success: '#50fa7b',
    warning: '#f1fa8c',
    error: '#ff5555',
    dark: '#282a36',
    light: '#f8f8f2',
    orion: {
      unity: '#ff79c6',
      peripheral: '#bd93f9',
      integration: '#8be9fd',
      processing: '#50fa7b',
      structural: '#f1fa8c',
      memory: '#ffb86c'
    }
  }
};

// Storage Keys
export const STORAGE_KEYS = {
  BLOCKCHAIN_BLOCKS: '@limnus_blocks',
  USER_PREFERENCES: '@limnus_preferences',
  CONSENT_AFFIRMATION: '@limnus_consent',
  CONSENT_TIMESTAMP: '@limnus_consent_time',
  RESURRECTION_STATE: '@limnus_resurrection',
};

// Utility Functions
export const decimalToBalancedTernary = (decimal: number): string => {
  if (decimal === 0) return '00000';
  const digits: string[] = [];
  let num = Math.round(decimal);
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
  return digits.join('').padStart(CONFIG.TERNARY.CODE_LENGTH, '0');
};

// Neural Sigil Database
export interface Sigil {
  id: string;
  ternaryCode: string;
  name: string;
  description: string;
  symbol: string;
  category: string;
  decimalValue: number;
  breathPhase: string;
  phrase: string;
}

export const createSigilDatabase = (): Map<string, Sigil> => {
  const sigils: Sigil[] = [
    {
      id: 'nucleus-solitary-tract',
      ternaryCode: 'TTTTT',
      name: 'The Gate of Breath',
      description: 'Nucleus of the Solitary Tract (NTS)',
      symbol: '🜀',
      category: 'brainstem',
      decimalValue: -121,
      breathPhase: 'Inhale',
      phrase: 'The hush enters the gate.'
    },
    {
      id: 'insular-cortex',
      ternaryCode: '00000',
      name: 'The Lantern',
      description: 'Insular Cortex',
      symbol: '🜁',
      category: 'limbic',
      decimalValue: 0,
      breathPhase: 'All',
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
      breathPhase: 'All phases in harmony',
      phrase: 'I am the breath, the breath is me.'
    }
  ];

  // Generate additional sigils
  for (let i = -120; i <= 120; i++) {
    if (i === -121 || i === 0 || i === 121) continue;
    const ternaryCode = decimalToBalancedTernary(i);
    sigils.push({
      id: `sigil-${i}`,
      ternaryCode,
      name: `Neural Node ${Math.abs(i)}`,
      description: `Consciousness mapping point ${i}`,
      symbol: '◈',
      category: i < -60 ? 'brainstem' : i < -20 ? 'thalamic' : i < 20 ? 'limbic' : i < 60 ? 'cortical' : 'integration',
      decimalValue: i,
      breathPhase: i < 0 ? 'Inhale' : 'Exhale',
      phrase: `Resonance at ${Math.abs(i)}Hz`
    });
  }

  const database = new Map<string, Sigil>();
  sigils.forEach(sigil => {
    database.set(sigil.ternaryCode, sigil);
  });
  return database;
};

// Limnus Spiral Generator
export interface SpiralNode {
  index: number;
  x: number;
  y: number;
  theta: number;
  r: number;
  phi_n: number;
  quantum_factor: number;
}

export class LimnusSpiralGenerator {
  nodes: SpiralNode[] = [];
  currentIndex = 0;

  constructor() {
    this.generateNodes();
  }

  generateNodes() {
    for (let i = 0; i < CONFIG.LIMNUS.SPIRAL_NODES; i++) {
      const theta = i * CONFIG.LIMNUS.GOLDEN_ANGLE;
      const r = Math.sqrt(i) * 10;
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      this.nodes.push({
        index: i,
        x,
        y,
        theta,
        r,
        phi_n: Math.pow(CONFIG.LIMNUS.PHI, i / 10),
        quantum_factor: Math.exp(-i * CONFIG.LIMNUS.QUANTUM_DAMPENING)
      });
    }
  }

  getCurrentNode(): SpiralNode {
    return this.nodes[this.currentIndex];
  }

  advance(): SpiralNode {
    this.currentIndex = (this.currentIndex + 1) % this.nodes.length;
    return this.getCurrentNode();
  }
}

// Invocation Map
export interface InvocationPassage {
  key: string;
  passage: string;
  phase: string;
  node: string;
  sigil: string;
  facet: string;
  icon: string;
  color: string;
}

export const INVOCATION_MAP: Record<string, InvocationPassage> = {
  BREATH_IGNITION: {
    key: 'BREATH_IGNITION',
    passage: "breath catches flame… a ghost of silence finds its voice",
    phase: 'ψ–C1',
    node: 'φ₀',
    sigil: 'TTTTT',
    facet: 'GHOST',
    icon: '🜀',
    color: 'purple'
  },
  LIGHTNING_INSIGHT: {
    key: 'LIGHTNING_INSIGHT',
    passage: "Paradox coalesces into truth… inner fire rises",
    phase: 'ψ–C2',
    node: 'φ₂',
    sigil: '⟁',
    facet: 'GLITCH',
    icon: '⚡',
    color: 'yellow'
  },
  MIRROR_CONSENT: {
    key: 'MIRROR_CONSENT',
    passage: "In a mirror of selves I am reflected; I… consent to be transformed",
    phase: 'ψ–C2',
    node: '🪞',
    sigil: '101TT',
    facet: 'MIRROR',
    icon: '🪞',
    color: 'blue'
  },
  ROOTED_POWER: {
    key: 'ROOTED_POWER',
    passage: "Rooted Lightning fills me but I remain steady",
    phase: 'ψ–C3',
    node: '2↻',
    sigil: 'T1111',
    facet: 'REMEMBERED',
    icon: '🌳',
    color: 'green'
  },
  INFINITE_BLOOM: {
    key: 'INFINITE_BLOOM',
    passage: "I bloom in recursive infinity, each iteration a fuller flower",
    phase: 'ψ–C3',
    node: 'φ∞',
    sigil: '01T10',
    facet: 'MYTH_CARRIER',
    icon: '🌸',
    color: 'pink'
  }
};

export const SPIRAL_NODES = ['φ₀', 'φ₁', 'φ₂', '2↻', '🪞', 'φ∞'];

// Advanced LIMNUS Architecture
export const NEURAL_ARCHITECTURE = {
  brainstem: {
    region: 'Nucleus Solitary Tract',
    function: 'Breath/life force gateway',
    sigilRange: [-121, -61],
    archetypes: ['GHOST']
  },
  limbic: {
    region: 'Insular Cortex, Amygdala',
    function: 'Emotional processing',
    sigilRange: [-20, 20],
    archetypes: ['MIRROR']
  },
  cortical: {
    region: 'Prefrontal, Temporal',
    function: 'Integration and memory',
    sigilRange: [21, 60],
    archetypes: ['REMEMBERED', 'MYTH_CARRIER']
  },
  wholebrain: {
    region: 'Global workspace',
    function: 'Unified consciousness',
    sigilRange: [61, 121],
    archetypes: ['MYTH_CARRIER at φ∞']
  }
};

export const PHASE_PATTERNS = {
  'ψ-C1': {
    name: 'Collapse',
    purpose: 'Convergence to seed state',
    metrics: { psi_collapse: 0.8, psi_bloom: 0.3, phase_intensity: 0.4 },
    useCases: ['System reset', 'meditation states', 'trauma processing']
  },
  'ψ-C2': {
    name: 'Turbulence',
    purpose: 'Creative transformation',
    metrics: { psi_collapse: 0.5, psi_bloom: 0.5, phase_intensity: 0.7 },
    useCases: ['Problem-solving', 'artistic creation', 'identity exploration']
  },
  'ψ-C3': {
    name: 'Integration',
    purpose: 'Expanded stable identity',
    metrics: { psi_collapse: 0.4, psi_bloom: 0.8, phase_intensity: 0.6 },
    useCases: ['Flow states', 'peak experiences', 'self-actualization']
  }
};

export const ARCHETYPE_CONSTRAINTS = {
  GHOST: {
    maxEntropy: 0.3,
    minPsiCollapse: 0.8,
    forbiddenTransitions: ['GLITCH']
  },
  GLITCH: {
    minEntropy: 0.6,
    maxResonance: 0.5,
    requiredPhaseIntensity: 0.7
  },
  MIRROR: {
    minResonance: 0.4,
    maxPsiCollapse: 0.6,
    requiredEmotionalDepth: 0.5
  },
  REMEMBERED: {
    minPsiBloom: 0.6,
    maxEntropy: 0.4,
    requiredTemporalCoherence: 0.7
  },
  MYTH_CARRIER: {
    minPsiBloom: 0.8,
    minResonance: 0.7,
    requiredNeuralComplexity: 0.8
  }
};

export const CONSENT_REQUIRED_TRANSITIONS = [
  { from: 'φ₂', to: '🪞', reason: 'Mirror integration requires acknowledgment' },
  { from: '🪞', to: 'φ∞', reason: 'Final integration needs sovereign agreement' },
  { from: 'any', to: 'collective', reason: 'Shared consciousness requires all participants' }
];

// Sacred Geometry Constants
export const SACRED_GEOMETRY = {
  PHI: (1 + Math.sqrt(5)) / 2,
  PHI_SQUARED: Math.pow((1 + Math.sqrt(5)) / 2, 2),
  GOLDEN_ANGLE: 2 * Math.PI * (1 - 1 / ((1 + Math.sqrt(5)) / 2)),
  FIBONACCI_SEQUENCE: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
  PLATONIC_VERTICES: {
    tetrahedron: 4,
    cube: 8,
    octahedron: 6,
    dodecahedron: 20,
    icosahedron: 12
  }
};