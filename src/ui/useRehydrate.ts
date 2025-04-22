import { useEffect } from "react";

interface Storage {
    readonly persist: {
        getOptions(): {
            readonly name?: string;
        };
        rehydrate(): void;
    };
}

export function useRehydrate(storage: Storage) {
    const name = storage.persist.getOptions().name;
    if (!name) {
        throw new Error("Storage must have name");
    }
    useEffect(() => {
        function handleStorageEvent(e: StorageEvent) {
            if (e.key === name) {
                return storage.persist.rehydrate();
            }
        }

        window.addEventListener("storage", handleStorageEvent);

        return () => window.removeEventListener("storage", handleStorageEvent);
    });
}
