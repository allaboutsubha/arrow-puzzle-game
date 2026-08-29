import { useCallback, useEffect, useRef, useState } from "react";
import { HomeScreen } from "./components/HomeScreen/HomeScreen";
import { LevelSelect } from "./components/LevelSelect/LevelSelect";
import { GameScreen } from "./components/GameScreen/GameScreen";
import { Settings } from "./components/Settings/Settings";
import { Toast } from "./components/Toast/Toast";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useSound } from "./hooks/useSound";

type Screen = "home" | "select" | "game";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [activeLevel, setActiveLevel] = useState(1);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<number | null>(null);

  const { save, refresh, storage } = useLocalStorage();
  const sound = useSound();

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastVisible(false), 1800);
  }, []);

  useEffect(() => {
    if (save.musicEnabled) {
      const start = () => {
        sound.startMusic();
        document.body.removeEventListener("pointerdown", start);
      };
      document.body.addEventListener("pointerdown", start, { once: true });
      return () => document.body.removeEventListener("pointerdown", start);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goPlay() {
    sound.ensureCtx();
    sound.click();
    refresh();
    setScreen("select");
  }

  function goHome() {
    sound.click();
    refresh();
    setScreen("home");
  }

  function selectLevel(id: number) {
    sound.click();
    setActiveLevel(id);
    setScreen("game");
  }

  function backFromGame() {
    sound.click();
    refresh();
    setScreen("select");
  }

  function changeLevel(id: number) {
    setActiveLevel(id);
    refresh();
  }

  function toggleSound() {
    storage.setSound(!storage.getAll().soundEnabled);
    refresh();
  }

  function toggleMusic() {
    const next = !storage.getAll().musicEnabled;
    storage.setMusic(next);
    if (next) sound.startMusic();
    else sound.stopMusic();
    refresh();
  }

  return (
    <div className="app-shell">
      {screen === "home" && (
        <HomeScreen
          coins={save.coins}
          soundOn={save.soundEnabled}
          onPlay={goPlay}
          onOpenSettings={() => setSettingsOpen(true)}
          onToggleSound={toggleSound}
        />
      )}

      {screen === "select" && (
        <LevelSelect save={save} onBack={goHome} onSelectLevel={selectLevel} />
      )}

      {screen === "game" && (
        <GameScreen
          levelId={activeLevel}
          onBack={backFromGame}
          onLevelChange={changeLevel}
          onToast={showToast}
        />
      )}

      {settingsOpen && (
        <Settings
          save={save}
          onSoundChange={toggleSound}
          onMusicChange={toggleMusic}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
}
