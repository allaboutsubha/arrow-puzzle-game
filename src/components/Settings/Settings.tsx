import { Button } from "../UI/Button";
import { Switch } from "../UI/Switch";
import type { SaveData } from "../../utils/storage";
import styles from "./Settings.module.css";

interface Props {
  save: SaveData;
  onSoundChange: (v: boolean) => void;
  onMusicChange: (v: boolean) => void;
  onClose: () => void;
}

export function Settings({ save, onSoundChange, onMusicChange, onClose }: Props) {
  return (
    <div className={styles.back}>
      <div className={styles.card}>
        <h3>Settings</h3>
        <div className={styles.row}>
          <span>Sound Effects</span>
          <Switch
            checked={save.soundEnabled}
            onChange={onSoundChange}
            label="Toggle sound effects"
          />
        </div>
        <div className={styles.row}>
          <span>Music</span>
          <Switch
            checked={save.musicEnabled}
            onChange={onMusicChange}
            label="Toggle music"
          />
        </div>
        <Button
          variant="secondary"
          style={{ width: "100%", marginTop: 14 }}
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
}
