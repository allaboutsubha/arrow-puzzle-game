import { useEffect, useRef, useState } from "react";
import { Button } from "../UI/Button";
import { COIN_REWARD } from "../../utils/constants";
import styles from "./LevelComplete.module.css";

interface Props {
  stars: number;
  hasNextLevel: boolean;
  onNext: () => void;
  onReplay: () => void;
  onCoinsSettled?: () => void;
}

export function LevelComplete({
  stars,
  hasNextLevel,
  onNext,
  onReplay,
  onCoinsSettled
}: Props) {
  const reward = COIN_REWARD[stars] ?? 0;
  const [litCount, setLitCount] = useState(0);
  const [coinDisplay, setCoinDisplay] = useState(0);
  const settledRef = useRef(false);

  useEffect(() => {
    setLitCount(0);
    setCoinDisplay(0);
    settledRef.current = false;
    const timers: number[] = [];
    for (let i = 1; i <= stars; i++) {
      timers.push(window.setTimeout(() => setLitCount(i), 200 + i * 180));
    }
    const step = Math.max(1, Math.round(reward / 16));
    let c = 0;
    const interval = window.setInterval(() => {
      c = Math.min(reward, c + step);
      setCoinDisplay(c);
      if (c >= reward) {
        window.clearInterval(interval);
        if (!settledRef.current) {
          settledRef.current = true;
          onCoinsSettled?.();
        }
      }
    }, 40);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stars, reward]);

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <h2>Level Complete!</h2>
        <p className={styles.sub}>Every arrow found its way out.</p>
        <div className={styles.starsRow}>
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`${styles.starBig} ${n <= litCount ? styles.lit : ""}`}
            >
              ★
            </span>
          ))}
        </div>
        <div className={styles.coinReward}>🪙 +{coinDisplay}</div>
        <div className={styles.actions}>
          <Button variant="primary" disabled={!hasNextLevel} onClick={onNext}>
            Next Level →
          </Button>
          <Button variant="secondary" onClick={onReplay}>
            Replay
          </Button>
        </div>
      </div>
    </div>
  );
}
