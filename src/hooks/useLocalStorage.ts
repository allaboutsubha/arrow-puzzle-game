import { useCallback, useState } from "react";
import { storage } from "../utils/storage";

/**
 * Thin reactive wrapper around the storage service so React
 * components re-render when persisted save data changes.
 */
export function useLocalStorage() {
  const [save, setSave] = useState(storage.getAll());

  const refresh = useCallback(() => {
    setSave({ ...storage.getAll() });
  }, []);

  return { save, refresh, storage };
}
