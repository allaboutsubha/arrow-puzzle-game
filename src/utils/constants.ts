export const STORAGE_KEY = "arrowPuzzleSave_v1";

export const TOTAL_LEVELS = 10;

export const HINT_COST = 50;

export const COIN_REWARD: Record<number, number> = {
  1: 20,
  2: 30,
  3: 50
};

export const MAX_UNDO_HISTORY = 10;

export const STARTING_COINS = 100;

export const DIRECTION_COLORS: Record<
  string,
  { body: string; dark: string }
> = {
  right: { body: "#FF6B6B", dark: "#E4514F" },
  left: { body: "#2CC9B7", dark: "#1FA394" },
  up: { body: "#FFC145", dark: "#E0A22B" },
  down: { body: "#8C7BFF", dark: "#6C58E0" }
};

export const THEME_COLOR = "#2289F2";
