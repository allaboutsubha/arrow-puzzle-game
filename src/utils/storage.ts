import { STORAGE_KEY, STARTING_COINS } from "./constants";

export interface SaveData {
  coins: number;
  unlockedLevel: number;
  stars: Record<number, number>;
  soundEnabled: boolean;
  musicEnabled: boolean;
}

function defaultSave(): SaveData {
  return {
    coins: STARTING_COINS,
    unlockedLevel: 1,
    stars: {},
    soundEnabled: true,
    musicEnabled: true
  };
}

class StorageService {
  private data: SaveData;

  constructor() {
    this.data = this.load();
  }

  private load(): SaveData {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultSave();
      return { ...defaultSave(), ...JSON.parse(raw) };
    } catch {
      return defaultSave();
    }
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch {
      /* ignore quota errors */
    }
  }

  getAll(): SaveData {
    return this.data;
  }

  addCoins(amount: number) {
    this.data.coins = Math.max(0, this.data.coins + amount);
    this.persist();
  }

  spendCoins(amount: number): boolean {
    if (this.data.coins < amount) return false;
    this.data.coins -= amount;
    this.persist();
    return true;
  }

  unlockLevel(levelId: number) {
    if (levelId > this.data.unlockedLevel) {
      this.data.unlockedLevel = levelId;
      this.persist();
    }
  }

  setStars(levelId: number, stars: number) {
    if (!this.data.stars[levelId] || this.data.stars[levelId] < stars) {
      this.data.stars[levelId] = stars;
      this.persist();
    }
  }

  setSound(enabled: boolean) {
    this.data.soundEnabled = enabled;
    this.persist();
  }

  setMusic(enabled: boolean) {
    this.data.musicEnabled = enabled;
    this.persist();
  }

  reset() {
    this.data = defaultSave();
    this.persist();
  }
}

export const storage = new StorageService();
