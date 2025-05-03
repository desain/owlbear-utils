import OBR from "@owlbear-rodeo/sdk";
export async function wrapRealInteraction(...items) {
    const [update, stop] = await OBR.interaction.startItemInteraction(items);
    return {
        update: (updater) => {
            const newItems = update(updater);
            return Promise.resolve(newItems);
        },
        keepAndStop: async (items) => {
            await OBR.scene.items.addItems(items); // SAFETY: OBR.scene.items.addItems does not mutate the argument, so casting to mutable is fine
            stop();
        },
        itemApi: OBR.scene.items,
    };
}
export async function createLocalInteraction(...items) {
    const ids = items.map((item) => item.id);
    const existingIds = (await OBR.scene.local.getItems(ids)).map((item) => item.id);
    const newItems = items.filter((item) => !existingIds.includes(item.id));
    await OBR.scene.local.addItems(newItems);
    return {
        update: async (updater) => {
            await OBR.scene.local.updateItems(ids, (items) => updater(items));
            return OBR.scene.local.getItems(ids); // SAFETY: retrieved items will always be the interaction items
        },
        keepAndStop: async (items) => {
            const idsToKeep = items.map((item) => item.id);
            const toDelete = newItems
                .map((item) => item.id)
                .filter((id) => !idsToKeep.includes(id));
            await OBR.scene.local.deleteItems(toDelete);
        },
        itemApi: OBR.scene.local,
    };
}
//# sourceMappingURL=AbstractInteraction.js.map