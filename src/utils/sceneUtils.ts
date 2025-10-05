import OBR from "@owlbear-rodeo/sdk";

export function sceneReady(): Promise<void> {
    return new Promise<void>((resolve) => {
        OBR.onReady(async () => {
            if (await OBR.scene.isReady()) {
                resolve();
            } else {
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