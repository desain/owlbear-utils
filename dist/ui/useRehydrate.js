import { useEffect } from "react";
export function startRehydrating(storage) {
    const name = storage.persist.getOptions().name;
    if (!name) {
        throw new Error("Storage must have name");
    }
    function handleStorageEvent(e) {
        if (e.key === name) {
            return storage.persist.rehydrate();
        }
    }
    window.addEventListener("storage", handleStorageEvent);
    return () => window.removeEventListener("storage", handleStorageEvent);
}
export function useRehydrate(storage) {
    useEffect(() => startRehydrating(storage));
}
//# sourceMappingURL=useRehydrate.js.map