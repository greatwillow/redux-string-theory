"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDimensionStore = void 0;
const createDimensionStore = (store, storeKey) => {
    const getState = () => store.getState()[storeKey];
    return {
        getState,
        subscribe: (callback) => {
            let lastState = getState();
            return store.subscribe(() => {
                if (lastState !== getState())
                    callback((lastState = getState()));
            });
        },
    };
};
exports.createDimensionStore = createDimensionStore;
