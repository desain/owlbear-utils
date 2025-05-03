import { useEffect } from "react";

interface Storage {
    readonly persist: {
        readonly getOptions: () => {
            readonly name?: string;
        };
        readonly rehydrate: () => void;
    };
}

export function startRehydrating(storage: Storage): VoidFunction {
    const name = storage.persist.getOptions().name;
    if (!name) {
        throw new Error("Storage must have name");
    }
    function handleStorageEvent(e: StorageEvent) {
        if (e.key === name) {
            return storage.persist.rehydrate();
        }
    }

    window.addEventListener("storage", handleStorageEvent);

    return () => window.removeEventListener("storage", handleStorageEvent);
}

export function useRehydrate(storage: Storage) {
    useEffect(() => startRehydrating(storage));
}
