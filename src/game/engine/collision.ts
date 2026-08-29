import type { ArrowState } from "../../levels/levelTypes";

export function isHorizontal(direction: ArrowState["direction"]): boolean {
  return direction === "left" || direction === "right";
}

export interface Cell {
  x: number;
  y: number;
}

export function getOccupiedCells(arrow: ArrowState): Cell[] {
  const cells: Cell[] = [];
  if (isHorizontal(arrow.direction)) {
    for (let i = 0; i < arrow.length; i++) {
      cells.push({ x: arrow.x + i, y: arrow.y });
    }
  } else {
    for (let i = 0; i < arrow.length; i++) {
      cells.push({ x: arrow.x, y: arrow.y + i });
    }
  }
  return cells;
}

export function getPathCells(arrow: ArrowState, gridSize: number): Cell[] {
  const cells: Cell[] = [];
  switch (arrow.direction) {
    case "right": {
      for (let x = arrow.x + arrow.length; x < gridSize; x++) {
        cells.push({ x, y: arrow.y });
      }
      break;
    }
    case "left": {
      for (let x = 0; x < arrow.x; x++) {
        cells.push({ x, y: arrow.y });
      }
      break;
    }
    case "down": {
      for (let y = arrow.y + arrow.length; y < gridSize; y++) {
        cells.push({ x: arrow.x, y });
      }
      break;
    }
    case "up": {
      for (let y = 0; y < arrow.y; y++) {
        cells.push({ x: arrow.x, y });
      }
      break;
    }
  }
  return cells;
}

export function getBlockingArrow(
  arrow: ArrowState,
  allArrows: ArrowState[],
  gridSize: number
): ArrowState | null {
  const path = getPathCells(arrow, gridSize);
  if (path.length === 0) return null;
  for (const other of allArrows) {
    if (other.id === arrow.id || other.exited) continue;
    const occupied = getOccupiedCells(other);
    for (const cell of occupied) {
      if (path.some((p) => p.x === cell.x && p.y === cell.y)) {
        return other;
      }
    }
  }
  return null;
}

export function canArrowExit(
  arrow: ArrowState,
  allArrows: ArrowState[],
  gridSize: number
): boolean {
  if (arrow.exited) return false;
  return getBlockingArrow(arrow, allArrows, gridSize) === null;
}
