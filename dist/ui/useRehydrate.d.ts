interface Storage {
    readonly persist: {
        readonly getOptions: () => {
            readonly name?: string;
        };
        readonly rehydrate: () => void;
    };
}
export declare function startRehydrating(storage: Storage): VoidFunction;
export declare function useRehydrate(storage: Storage): void;
export {};
//# sourceMappingURL=useRehydrate.d.ts.map