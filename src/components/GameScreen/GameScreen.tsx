import { useEffect, useRef, useState } from "react";
import { TopBar } from "../TopBar/TopBar";
import { GameBoard } from "../GameBoard/GameBoard";
import { BottomControls } from "../BottomControls/BottomControls";
import { LevelComplete } from "../LevelComplete/LevelComplete";
import { useGameStore } from "../../store/gameStore";
import { useSound } from "../../hooks/useSound";
import { TOTAL_LEVELS } from "../../utils/constants";

interface Props {
  levelId: number;
  onBack: () => void;
  onLevelChange: (id: number) => void;
  onToast: (msg: string) => void;
}

export function GameScreen({ levelId, onBack, onLevelChange, onToast }: Props) {
  const store = useGameStore();
  const sound = useSound();
  const loadedRef = useRef<number | null>(null);

  useEffect(() => {
    if (loadedRef.current !== levelId) {
      store.loadLevel(levelId);
      loadedRef.current = levelId;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelId]);

  const [pendingComplete, setPendingComplete] = useState(false);

  useEffect(() => {
    if (store.completed) {
      sound.complete();
      const t = setTimeout(() => setPendingComplete(true), 250);
      return () => clearTimeout(t);
    }
    setPendingComplete(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.completed]);

  function handleArrowTap(id: string) {
    const result = store.attemptMove(id);
    if (result === "success") sound.move();
    if (result === "blocked") sound.blocked();
  }

  function handleHint() {
    const result = store.useHint();
    if (result === "no-coins") onToast("Not enough coins for a hint");
    else if (result === "no-move") onToast("No moves available — try Undo or Restart");
    else sound.click();
  }

  function handleUndo() {
    if (!store.canUndo) return;
    store.undo();
    sound.click();
  }

  function handleRestart() {
    if (window.confirm("Restart this level from the beginning?")) {
      store.restart();
      sound.click();
    }
  }

  if (!store.level) return null;

  return (
    <section className="screen" style={{ position: "relative" }}>
      <TopBar levelId={store.levelId} coins={store.coins} onBack={onBack} />
      <GameBoard
        gridSize={store.gridSize}
        arrows={store.arrows}
        hintedArrowId={store.hintedArrowId}
        shakeArrowId={store.shakeArrowId}
        onArrowTap={handleArrowTap}
        onShakeEnd={store.clearShake}
      />
      <BottomControls
        canUndo={store.canUndo}
        onRestart={handleRestart}
        onUndo={handleUndo}
        onHint={handleHint}
      />
      {pendingComplete && (
        <LevelComplete
          stars={store.computeCurrentStars()}
          hasNextLevel={store.nextLevelId <= TOTAL_LEVELS}
          onNext={() => {
            if (store.nextLevelId <= TOTAL_LEVELS) {
              onLevelChange(store.nextLevelId);
            } else {
              onBack();
            }
          }}
          onReplay={() => {
            setPendingComplete(false);
            store.restart();
          }}
          onCoinsSettled={() => sound.coin()}
        />
      )}
    </section>
  );
}
