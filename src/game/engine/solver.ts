import type { Level, ArrowState } from "../../levels/levelTypes";
import { canArrowExit } from "./collision";

export interface SolveResult {
  solvable: boolean;
  order: string[];
}

/**
 * Greedy solver: repeatedly remove any currently-unblocked arrow.
 * Removing an arrow can only ever clear space for others (monotonic),
 * never block a previously-clear path. Because of this, the order in
 * which unblocked arrows are removed does not matter — if a solution
 * exists at all, this greedy approach is guaranteed to find it.
 */
export function solveLevel(level: Level): SolveResult {
  const arrows: ArrowState[] = level.arrows.map((a) => ({
    ...a,
    exited: false
  }));
  const order: string[] = [];
  let progress = true;

  while (progress) {
    progress = false;
    for (const arrow of arrows) {
      if (arrow.exited) continue;
      if (canArrowExit(arrow, arrows, level.gridSize)) {
        arrow.exited = true;
        order.push(arrow.id);
        progress = true;
      }
    }
  }

  return { solvable: arrows.every((a) => a.exited), order };
}

export function getHint(
  arrows: ArrowState[],
  gridSize: number
): ArrowState | null {
  for (const arrow of arrows) {
    if (!arrow.exited && canArrowExit(arrow, arrows, gridSize)) {
      return arrow;
    }
  }
  return null;
}
