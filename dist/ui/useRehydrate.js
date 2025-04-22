import { useEffect } from "react";
export function useRehydrate(storage) {
    const name = storage.persist.getOptions().name;
    if (!name) {
        throw new Error("Storage must have name");
    }
    useEffect(() => {
        function handleStorageEvent(e) {
            if (e.key === name) {
                return storage.persist.rehydrate();
            }
        }
        window.addEventListener("storage", handleStorageEvent);
        return () => window.removeEventListener("storage", handleStorageEvent);
    });
}
//# sourceMappingURL=useRehydrate.js.map