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