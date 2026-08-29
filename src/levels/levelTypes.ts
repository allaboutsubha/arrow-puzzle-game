export type Direction = "up" | "down" | "left" | "right";
export type Difficulty = "easy" | "medium" | "hard";

export interface Arrow {
  id: string;
  x: number;
  y: number;
  direction: Direction;
  length: number;
}

export interface ArrowState extends Arrow {
  exited: boolean;
}

export interface Level {
  id: number;
  gridSize: number;
  difficulty: Difficulty;
  arrows: Arrow[];
}
