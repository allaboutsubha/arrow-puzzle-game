import { useCallback, useMemo, useState } from "react";
import type { ArrowState } from "../levels/levelTypes";
import { getLevel } from "../levels/levels";
import { canArrowExit } from "../game/engine/collision";
import { isLevelComplete } from "../game/engine/movement";
import { getHint as engineGetHint } from "../game/engine/solver";
import { computeStars } from "../game/engine/scoring";
import { storage } from "../utils/storage";
import { HINT_COST, COIN_REWARD, MAX_UNDO_HISTORY } from "../utils/constants";

export type MoveResult = "success" | "blocked" | "noop";

interface HistoryEntry {
  arrows: ArrowState[];
}

export function useGameStore() {
  const [levelId, setLevelId] = useState<number>(1);
  const [arrows, setArrows] = useState<ArrowState[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [undosUsed, setUndosUsed] = useState(0);
  const [hintedArrowId, setHintedArrowId] = useState<string | null>(null);
  const [shakeArrowId, setShakeArrowId] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [coins, setCoins] = useState(storage.getAll().coins);

  const level = useMemo(() => getLevel(levelId), [levelId]);
  const gridSize = level?.gridSize ?? 4;

  const loadLevel = useCallback((id: number) => {
    const lvl = getLevel(id);
    if (!lvl) return;
    setLevelId(id);
    setArrows(lvl.arrows.map((a) => ({ ...a, exited: false })));
    setHistory([]);
    setHintsUsed(0);
    setUndosUsed(0);
    setHintedArrowId(null);
    setShakeArrowId(null);
    setCompleted(false);
  }, []);

  const attemptMove = useCallback(
    (arrowId: string): MoveResult => {
      const arrow = arrows.find((a) => a.id === arrowId);
      if (!arrow || arrow.exited) return "noop";
      setHintedArrowId(null);

      if (canArrowExit(arrow, arrows, gridSize)) {
        setHistory((h) => {
          const next = [...h, { arrows }];
          return next.length > MAX_UNDO_HISTORY ? next.slice(1) : next;
        });
        const nextArrows = arrows.map((a) =>
          a.id === arrowId ? { ...a, exited: true } : a
        );
        setArrows(nextArrows);

        if (isLevelComplete(nextArrows)) {
          const stars = computeStars(hintsUsed, undosUsed);
          const reward = COIN_REWARD[stars] ?? 0;
          storage.setStars(levelId, stars);
          storage.unlockLevel(levelId + 1);
          storage.addCoins(reward);
          setCoins(storage.getAll().coins);
          setCompleted(true);
        }
        return "success";
      }

      setShakeArrowId(arrowId);
      return "blocked";
    },
    [arrows, gridSize, hintsUsed, undosUsed, levelId]
  );

  const clearShake = useCallback(() => setShakeArrowId(null), []);

  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const last = h[h.length - 1];
      setArrows(last.arrows);
      setUndosUsed((u) => u + 1);
      setHintedArrowId(null);
      return h.slice(0, -1);
    });
  }, []);

  const restart = useCallback(() => {
    if (!level) return;
    setArrows(level.arrows.map((a) => ({ ...a, exited: false })));
    setHistory([]);
    setHintsUsed(0);
    setUndosUsed(0);
    setHintedArrowId(null);
    setCompleted(false);
  }, [level]);

  const useHint = useCallback((): "ok" | "no-coins" | "no-move" => {
    const currentCoins = storage.getAll().coins;
    if (currentCoins < HINT_COST) return "no-coins";
    const hint = engineGetHint(arrows, gridSize);
    if (!hint) return "no-move";
    storage.spendCoins(HINT_COST);
    setCoins(storage.getAll().coins);
    setHintsUsed((h) => h + 1);
    setHintedArrowId(hint.id);
    return "ok";
  }, [arrows, gridSize]);

  const nextLevelId = levelId + 1;

  return {
    level,
    levelId,
    arrows,
    gridSize,
    coins,
    hintedArrowId,
    shakeArrowId,
    completed,
    canUndo: history.length > 0,
    hintsUsed,
    undosUsed,
    nextLevelId,
    loadLevel,
    attemptMove,
    clearShake,
    undo,
    restart,
    useHint,
    computeCurrentStars: () => computeStars(hintsUsed, undosUsed)
  };
}