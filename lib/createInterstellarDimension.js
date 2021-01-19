"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInterstellarDimension = void 0;
const storeRegistry_1 = require("./storeRegistry");
const createBaseDimension_1 = require("./createBaseDimension");
const asyncStatusAutomationHelpers_1 = require("./asyncStatusAutomationHelpers");
/**
 * @param dimensionStoreKey represents the name of the dimension of the redux store
 *
 * @param initialStateClosure represents the initial state of the given dimension
 *
 * @param getDimensionReducersFunction is a function that passes state to a series of mapped reducers
 *
 * @param dimensionAsyncActions is a map of asynchronous actions with their properties specified
 *
 * @returns an object representing the store dimension properties
 */
const createInterstellarDimension = (dimensionParamers) => {
    if (dimensionParamers.store === undefined)
        dimensionParamers.store = storeRegistry_1.getStore();
    if (dimensionParamers.addAsyncStatusAutomationState === undefined)
        dimensionParamers.addAsyncStatusAutomationState = true;
    const { dimensionStoreKey, initialStateClosure, reducersClosure, selectorsClosure, asyncActionsClosure, customHooksClosure, externalDependencies, addAsyncStatusAutomationState, store, } = dimensionParamers;
    const baseDimension = createBaseDimension_1.createBaseDimension(dimensionStoreKey, initialStateClosure, reducersClosure, externalDependencies, store);
    let asyncStatusesDimension;
    let customHooks = {};
    const selectors = selectorsClosure(Object.assign({ dimension: baseDimension }, externalDependencies));
    let asyncActions = asyncActionsClosure(Object.assign({ dimension: Object.assign(Object.assign({}, baseDimension), { selectors }) }, externalDependencies));
    if (addAsyncStatusAutomationState) {
        asyncStatusesDimension = asyncStatusAutomationHelpers_1.createAsyncStatusesDimension(dimensionStoreKey, asyncActions, externalDependencies);
        asyncActions = asyncStatusAutomationHelpers_1.composeAsyncStatusAutomationState(asyncActions, asyncStatusesDimension);
    }
    const useAsyncStatuses = asyncStatusesDimension ? asyncStatusesDimension.use : undefined;
    if (customHooksClosure)
        customHooks = customHooksClosure(Object.assign({ dimension: Object.assign(Object.assign({}, baseDimension), { selectors, asyncActions, useAsyncStatuses }) }, externalDependencies));
    return Object.assign(Object.assign({}, baseDimension), { selectors,
        asyncActions,
        customHooks,
        useAsyncStatuses });
};
exports.createInterstellarDimension = createInterstellarDimension;
