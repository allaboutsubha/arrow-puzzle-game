import { Button } from "../UI/Button";
import { TOTAL_LEVELS } from "../../utils/constants";
import type { SaveData } from "../../utils/storage";
import styles from "./LevelSelect.module.css";

interface Props {
  save: SaveData;
  onBack: () => void;
  onSelectLevel: (id: number) => void;
}

export function LevelSelect({ save, onBack, onSelectLevel }: Props) {
  const levelIds = Array.from({ length: TOTAL_LEVELS }, (_, i) => i + 1);

  return (
    <section className="screen">
      <div className={styles.topline}>
        <Button variant="icon" aria-label="Back to home" onClick={onBack}>
          ←
        </Button>
        <h2>Choose a Level</h2>
        <div className={styles.chip}>
          🪙 <span>{save.coins}</span>
        </div>
      </div>
      <div className={styles.grid}>
        {levelIds.map((id) => {
          const locked = id > save.unlockedLevel;
          const starCount = save.stars[id] ?? 0;
          const done = starCount > 0;
          const cls = [
            styles.cell,
            locked ? styles.locked : "",
            done ? styles.done : ""
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <button
              key={id}
              className={cls}
              disabled={locked}
              aria-label={`Level ${id}${locked ? " (locked)" : ""}`}
              onClick={() => onSelectLevel(id)}
            >
              {locked ? "🔒" : id}
              <div className={styles.stars}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`${styles.s} ${i < starCount ? styles.on : ""}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
