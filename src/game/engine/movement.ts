import type { ArrowState } from "../../levels/levelTypes";
import { canArrowExit } from "./collision";

export function moveArrow(
  arrowId: string,
  arrows: ArrowState[],
  gridSize: number
): { success: boolean; arrows: ArrowState[] } {
  const arrow = arrows.find((a) => a.id === arrowId);
  if (!arrow || arrow.exited) {
    return { success: false, arrows };
  }
  if (!canArrowExit(arrow, arrows, gridSize)) {
    return { success: false, arrows };
  }
  const next = arrows.map((a) =>
    a.id === arrowId ? { ...a, exited: true } : a
  );
  return { success: true, arrows: next };
}

export function removeArrow(
  arrowId: string,
  arrows: ArrowState[]
): ArrowState[] {
  return arrows.map((a) => (a.id === arrowId ? { ...a, exited: true } : a));
}

export function isLevelComplete(arrows: ArrowState[]): boolean {
  return arrows.every((a) => a.exited);
}

export function resetLevel(originalArrows: ArrowState[]): ArrowState[] {
  return originalArrows.map((a) => ({ ...a, exited: false }));
}
