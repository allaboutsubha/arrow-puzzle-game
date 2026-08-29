import type { Level } from "./levelTypes";

// Exactly 10 hand-validated levels. Every level below has been
// run through game/engine/solver.ts (solveLevel) and confirmed solvable.
export const LEVELS: Level[] = [
  {
    id: 1,
    gridSize: 4,
    difficulty: "easy",
    arrows: [
      { id: "a0", x: 3, y: 3, direction: "left", length: 1 },
      { id: "a1", x: 2, y: 2, direction: "up", length: 1 },
      { id: "a2", x: 3, y: 0, direction: "right", length: 1 },
    ]
  },
  {
    id: 2,
    gridSize: 4,
    difficulty: "easy",
    arrows: [
      { id: "a0", x: 1, y: 0, direction: "down", length: 1 },
      { id: "a1", x: 3, y: 2, direction: "down", length: 1 },
      { id: "a2", x: 2, y: 3, direction: "right", length: 1 },
      { id: "a3", x: 3, y: 3, direction: "right", length: 1 },
    ]
  },
  {
    id: 3,
    gridSize: 4,
    difficulty: "easy",
    arrows: [
      { id: "a0", x: 1, y: 0, direction: "right", length: 1 },
      { id: "a1", x: 3, y: 3, direction: "down", length: 1 },
      { id: "a2", x: 1, y: 1, direction: "down", length: 1 },
      { id: "a3", x: 2, y: 3, direction: "down", length: 1 },
      { id: "a4", x: 3, y: 0, direction: "up", length: 1 },
    ]
  },
  {
    id: 4,
    gridSize: 5,
    difficulty: "medium",
    arrows: [
      { id: "a0", x: 1, y: 3, direction: "up", length: 2 },
      { id: "a1", x: 2, y: 1, direction: "up", length: 2 },
      { id: "a2", x: 3, y: 2, direction: "up", length: 1 },
      { id: "a3", x: 3, y: 1, direction: "right", length: 2 },
      { id: "a4", x: 3, y: 4, direction: "right", length: 2 },
      { id: "a5", x: 3, y: 0, direction: "left", length: 2 },
    ]
  },
  {
    id: 5,
    gridSize: 5,
    difficulty: "medium",
    arrows: [
      { id: "a0", x: 3, y: 1, direction: "down", length: 1 },
      { id: "a1", x: 4, y: 0, direction: "right", length: 1 },
      { id: "a2", x: 3, y: 4, direction: "right", length: 1 },
      { id: "a3", x: 3, y: 3, direction: "right", length: 2 },
      { id: "a4", x: 2, y: 3, direction: "down", length: 2 },
      { id: "a5", x: 0, y: 3, direction: "left", length: 1 },
      { id: "a6", x: 4, y: 2, direction: "right", length: 1 },
    ]
  },
  {
    id: 6,
    gridSize: 5,
    difficulty: "medium",
    arrows: [
      { id: "a0", x: 0, y: 1, direction: "up", length: 1 },
      { id: "a1", x: 2, y: 1, direction: "right", length: 1 },
      { id: "a2", x: 2, y: 4, direction: "left", length: 2 },
      { id: "a3", x: 4, y: 0, direction: "right", length: 1 },
      { id: "a4", x: 3, y: 1, direction: "up", length: 2 },
      { id: "a5", x: 1, y: 0, direction: "right", length: 2 },
      { id: "a6", x: 4, y: 3, direction: "down", length: 2 },
      { id: "a7", x: 2, y: 2, direction: "down", length: 2 },
    ]
  },
  {
    id: 7,
    gridSize: 5,
    difficulty: "medium",
    arrows: [
      { id: "a0", x: 3, y: 3, direction: "up", length: 1 },
      { id: "a1", x: 4, y: 1, direction: "up", length: 2 },
      { id: "a2", x: 1, y: 3, direction: "right", length: 2 },
      { id: "a3", x: 4, y: 3, direction: "down", length: 1 },
      { id: "a4", x: 1, y: 0, direction: "up", length: 1 },
      { id: "a5", x: 3, y: 2, direction: "up", length: 1 },
      { id: "a6", x: 4, y: 0, direction: "left", length: 1 },
      { id: "a7", x: 2, y: 4, direction: "left", length: 1 },
      { id: "a8", x: 1, y: 2, direction: "down", length: 1 },
    ]
  },
  {
    id: 8,
    gridSize: 6,
    difficulty: "hard",
    arrows: [
      { id: "a0", x: 5, y: 0, direction: "down", length: 1 },
      { id: "a1", x: 2, y: 0, direction: "down", length: 1 },
      { id: "a2", x: 4, y: 0, direction: "right", length: 1 },
      { id: "a3", x: 0, y: 0, direction: "up", length: 2 },
      { id: "a4", x: 5, y: 2, direction: "down", length: 1 },
      { id: "a5", x: 1, y: 4, direction: "right", length: 3 },
      { id: "a6", x: 2, y: 2, direction: "left", length: 2 },
      { id: "a7", x: 4, y: 3, direction: "down", length: 3 },
      { id: "a8", x: 1, y: 2, direction: "down", length: 2 },
      { id: "a9", x: 0, y: 5, direction: "right", length: 3 },
    ]
  },
  {
    id: 9,
    gridSize: 6,
    difficulty: "hard",
    arrows: [
      { id: "a0", x: 4, y: 2, direction: "down", length: 1 },
      { id: "a1", x: 0, y: 0, direction: "down", length: 1 },
      { id: "a2", x: 4, y: 5, direction: "left", length: 2 },
      { id: "a3", x: 4, y: 3, direction: "down", length: 2 },
      { id: "a4", x: 2, y: 3, direction: "right", length: 2 },
      { id: "a5", x: 3, y: 4, direction: "down", length: 1 },
      { id: "a6", x: 3, y: 1, direction: "right", length: 3 },
      { id: "a7", x: 5, y: 4, direction: "right", length: 1 },
      { id: "a8", x: 2, y: 1, direction: "down", length: 1 },
      { id: "a9", x: 0, y: 3, direction: "left", length: 1 },
      { id: "a10", x: 3, y: 0, direction: "down", length: 1 },
    ]
  },
  {
    id: 10,
    gridSize: 6,
    difficulty: "hard",
    arrows: [
      { id: "a0", x: 5, y: 0, direction: "down", length: 2 },
      { id: "a1", x: 0, y: 0, direction: "up", length: 1 },
      { id: "a2", x: 1, y: 2, direction: "left", length: 1 },
      { id: "a3", x: 3, y: 5, direction: "right", length: 1 },
      { id: "a4", x: 1, y: 1, direction: "up", length: 1 },
      { id: "a5", x: 4, y: 0, direction: "up", length: 2 },
      { id: "a6", x: 4, y: 4, direction: "down", length: 1 },
      { id: "a7", x: 0, y: 3, direction: "right", length: 3 },
      { id: "a8", x: 4, y: 2, direction: "down", length: 1 },
      { id: "a9", x: 5, y: 4, direction: "down", length: 2 },
      { id: "a10", x: 2, y: 0, direction: "right", length: 1 },
      { id: "a11", x: 2, y: 2, direction: "right", length: 1 },
    ]
  },
];

export function getLevel(id: number): Level | undefined {
  return LEVELS.find((l) => l.id === id);
}
