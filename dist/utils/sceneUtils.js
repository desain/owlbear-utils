import OBR from "@owlbear-rodeo/sdk";
export function sceneReadyPromise() {
    return new Promise((resolve) => {
        OBR.onReady(async () => {
            if (await OBR.scene.isReady()) {
                resolve();
            }
            else {
                const unsub = OBR.scene.onReadyChange((ready) => {
                    if (ready) {
                        unsub();
                        resolve();
                    }
                });
            }
        });
    });
}
//# sourceMappingURL=sceneUtils.js.map