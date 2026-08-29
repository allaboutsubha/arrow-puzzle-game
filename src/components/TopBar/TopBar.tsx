import { Button } from "../UI/Button";
import styles from "./TopBar.module.css";

interface Props {
  levelId: number;
  coins: number;
  onBack: () => void;
}

export function TopBar({ levelId, coins, onBack }: Props) {
  return (
    <div className={styles.bar}>
      <Button variant="icon" aria-label="Back to level select" onClick={onBack}>
        ←
      </Button>
      <div className={styles.levelLabel}>
        <small>Level</small>
        <span>{levelId}</span>
      </div>
      <div className={styles.chip}>
        🪙 <span>{coins}</span>
      </div>
    </div>
  );
}
