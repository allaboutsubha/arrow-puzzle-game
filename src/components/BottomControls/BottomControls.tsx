import { Button } from "../UI/Button";
import { HINT_COST } from "../../utils/constants";
import styles from "./BottomControls.module.css";

interface Props {
  canUndo: boolean;
  onRestart: () => void;
  onUndo: () => void;
  onHint: () => void;
}

export function BottomControls({ canUndo, onRestart, onUndo, onHint }: Props) {
  return (
    <div className={styles.bar}>
      <Button variant="icon" aria-label="Restart level" onClick={onRestart}>
        ⟲
      </Button>
      <Button
        variant="icon"
        aria-label="Undo last move"
        disabled={!canUndo}
        onClick={onUndo}
      >
        ↩
      </Button>
      <Button
        variant="icon"
        aria-label="Use a hint"
        badge={HINT_COST}
        onClick={onHint}
      >
        💡
      </Button>
    </div>
  );
}
