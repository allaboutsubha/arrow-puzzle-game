import { Button } from "../UI/Button";
import styles from "./HomeScreen.module.css";

interface Props {
  coins: number;
  soundOn: boolean;
  onPlay: () => void;
  onOpenSettings: () => void;
  onToggleSound: () => void;
}

export function HomeScreen({
  coins,
  soundOn,
  onPlay,
  onOpenSettings,
  onToggleSound
}: Props) {
  return (
    <section className={`screen ${styles.screen}`}>
      <div className={styles.coinPill} aria-hidden="true">
        🪙 <span>{coins}</span>
      </div>

      <div className={styles.logoWrap}>
        <svg className={styles.logoMark} viewBox="0 0 100 100" aria-hidden="true">
          <rect x="8" y="8" width="84" height="84" rx="22" fill="#2289F2" />
          <g transform="translate(50 50)">
            <polygon
              points="-22,-6 6,-6 6,-16 26,0 6,16 6,6 -22,6"
              fill="#FFC145"
            />
          </g>
        </svg>
        <h1 className={styles.title}>
          Arrow<br />
          <span>Puzzle</span>
        </h1>
        <p className={styles.subtitle}>
          Slide colored arrows off the board, one clear path at a time.
        </p>
      </div>

      <div className={styles.actions}>
        <Button variant="primary" onClick={onPlay} aria-label="Play">
          ▶ Play
        </Button>
        <div className={styles.row}>
          <Button variant="icon" aria-label="Settings" onClick={onOpenSettings}>
            ⚙
          </Button>
          <Button
            variant="icon"
            aria-label="Toggle sound"
            onClick={onToggleSound}
          >
            {soundOn ? "🔊" : "🔇"}
          </Button>
        </div>
      </div>
    </section>
  );
}
