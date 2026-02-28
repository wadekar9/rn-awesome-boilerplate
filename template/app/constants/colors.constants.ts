/**
 * ==============================
 * BRAND
 * ==============================
 */
const BRAND = {
  primary: '#4285F4',
  'primary-soft': 'rgba(66,133,244,0.10)',
  'primary-pressed': '#2F6FE4',
  'primary-soft-pressed': 'rgba(66,133,244,0.15)',
} as const;

/**
 * ==============================
 * NEUTRAL SCALE (Slate-based)
 * ==============================
 */
const NEUTRAL = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: '#64748B',
  600: '#475569',
  700: '#334155',
  800: '#1E293B',
  900: '#0F172A',
} as const;

/**
 * ==============================
 * SEMANTIC COLORS
 * ==============================
 */
const SEMANTIC = {
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
} as const;

/**
 * ==============================
 * THEME
 * ==============================
 */
export const COLORS = {
  light: {
    // Backgrounds
    background: NEUTRAL[50],
    surface: '#FFFFFF',
    'surface-alt': NEUTRAL[100],

    // Text
    'text-primary': NEUTRAL[900],
    'text-secondary': NEUTRAL[500],
    'text-muted': NEUTRAL[400],

    // Icons
    'icon-primary': BRAND.primary,
    'icon-default': NEUTRAL[600],
    'icon-muted': NEUTRAL[400],
    'icon-destructive': SEMANTIC.danger,

    // Borders
    border: NEUTRAL[200],

    // Brand
    'brand-primary': BRAND.primary,
    'brand-primary-soft': BRAND['primary-soft'],
    'brand-primary-pressed': BRAND['primary-pressed'],
    'brand-primary-soft-pressed': BRAND['primary-soft-pressed'],

    // States
    'state-success': SEMANTIC.success,
    'state-warning': SEMANTIC.warning,
    'state-danger': SEMANTIC.danger,

    // Effects
    shadow: 'rgba(15, 23, 42, 0.08)',
  },

  dark: {
    // Backgrounds
    background: NEUTRAL[900],
    surface: NEUTRAL[800],
    'surface-alt': NEUTRAL[700],

    // Text
    'text-primary': NEUTRAL[50],
    'text-secondary': NEUTRAL[400],
    'text-muted': NEUTRAL[500],

    // Icons
    'icon-primary': BRAND.primary,
    'icon-default': NEUTRAL[400],
    'icon-muted': NEUTRAL[500],
    'icon-destructive': SEMANTIC.danger,

    // Borders
    border: NEUTRAL[700],

    // Brand
    'brand-primary': BRAND.primary,
    'brand-primary-soft': 'rgba(66,133,244,0.18)',
    'brand-primary-pressed': '#5A97F6',
    'brand-primary-soft-pressed': 'rgba(66,133,244,0.20)',

    // States
    'state-success': SEMANTIC.success,
    'state-warning': SEMANTIC.warning,
    'state-danger': SEMANTIC.danger,

    // Effects
    shadow: 'rgba(0, 0, 0, 0.4)',
  },
} as const;
