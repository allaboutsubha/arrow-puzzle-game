import type { ArrowState } from "../../levels/levelTypes";
import { Arrow } from "../Arrow/Arrow";
import styles from "./GameBoard.module.css";

interface Props {
  gridSize: number;
  arrows: ArrowState[];
  hintedArrowId: string | null;
  shakeArrowId: string | null;
  onArrowTap: (id: string) => void;
  onShakeEnd: () => void;
}

export function GameBoard({
  gridSize,
  arrows,
  hintedArrowId,
  shakeArrowId,
  onArrowTap,
  onShakeEnd
}: Props) {
  const cells = [];
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      cells.push(
        <rect
          key={`cell-${x}-${y}`}
          className={styles.cellBg}
          x={x + 0.03}
          y={y + 0.03}
          width={0.94}
          height={0.94}
          rx={0.14}
        />
      );
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.frame}>
        <svg
          className={styles.svg}
          viewBox={`0 0 ${gridSize} ${gridSize}`}
          aria-label="Puzzle board"
        >
          {cells}
          {arrows.map((arrow) => {
            const offset = arrow.exited
              ? computeExitOffset(arrow, gridSize)
              : null;
            return (
              <Arrow
                key={arrow.id}
                arrow={arrow}
                exitOffset={offset}
                hinted={arrow.id === hintedArrowId}
                shaking={arrow.id === shakeArrowId}
                onTap={onArrowTap}
                onShakeEnd={onShakeEnd}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function computeExitOffset(arrow: ArrowState, gridSize: number) {
  const reach = gridSize + 2;
  switch (arrow.direction) {
    case "right":
      return { dx: reach, dy: 0 };
    case "left":
      return { dx: -reach, dy: 0 };
    case "down":
      return { dx: 0, dy: reach };
    case "up":
      return { dx: 0, dy: -reach };
  }
}
