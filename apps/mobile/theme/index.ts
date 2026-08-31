import { colors as allColors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { shadows } from './shadows';
import { radius } from './radius';

// Default to dark theme for now, we will add a dynamic hook later
export const theme = {
  colors: allColors.dark,
  typography,
  spacing,
  shadows,
  radius,
};

export type Theme = typeof theme;
