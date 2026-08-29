export interface ScoringConfig {
  perfectPenaltyThreshold: number;
  goodPenaltyThreshold: number;
}

export const DEFAULT_SCORING: ScoringConfig = {
  perfectPenaltyThreshold: 0,
  goodPenaltyThreshold: 2
};

/**
 * Stars are based on how much outside help (hints + undos) the
 * player needed to clear the level.
 */
export function computeStars(
  hintsUsed: number,
  undosUsed: number,
  config: ScoringConfig = DEFAULT_SCORING
): number {
  const penalties = hintsUsed + undosUsed;
  if (penalties <= config.perfectPenaltyThreshold) return 3;
  if (penalties <= config.goodPenaltyThreshold) return 2;
  return 1;
}
