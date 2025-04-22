interface Storage {
    readonly persist: {
        getOptions(): {
            readonly name?: string;
        };
        rehydrate(): void;
    };
}
export declare function useRehydrate(storage: Storage): void;
export {};
//# sourceMappingURL=useRehydrate.d.ts.map