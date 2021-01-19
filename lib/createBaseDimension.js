"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBaseDimension = void 0;
const react_redux_1 = require("react-redux");
const storeRegistry_1 = require("./storeRegistry");
const dimensionStoreRegistry_1 = require("./dimensionStoreRegistry");
const mapReducersToStoreDispatch = (dimensionStoreKey, reducers, callback) => {
    const mappedReducer = {};
    Object.keys(reducers).forEach((key) => {
        const newKey = key.replace(`${dimensionStoreKey}_/_`, '');
        mappedReducer[newKey] = callback(key);
    });
    return mappedReducer;
};
const initializeDimensionReducers = (dimensionStoreKey, initialState, reducers, store) => {
    const baseReducers = {};
    store.injectReducer(dimensionStoreKey, (state = initialState, { type, payload }) => {
        const stateEnhancedReducers = reducers(state);
        Object.keys(stateEnhancedReducers).forEach((key) => {
            baseReducers[`${dimensionStoreKey}_/_${key}`] = stateEnhancedReducers[key];
        });
        return baseReducers[type] ? baseReducers[type](payload) : state;
    });
    return baseReducers;
};
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
const createBaseDimension = (dimensionStoreKey, initialStateClosure, reducersClosure, externalDependencies, store = storeRegistry_1.getStore()) => {
    const initialState = initialStateClosure(externalDependencies);
    const reducers = reducersClosure(externalDependencies);
    const dimensionReducers = initializeDimensionReducers(dimensionStoreKey, initialState, reducers, store);
    const dimensionStore = dimensionStoreRegistry_1.createDimensionStore(store, dimensionStoreKey);
    const dimensionState = () => react_redux_1.useSelector((storeState) => storeState[dimensionStoreKey]);
    const dispatchedDimensionReducers = mapReducersToStoreDispatch(dimensionStoreKey, dimensionReducers, (type) => (payload) => {
        store.dispatch({ type, payload });
    });
    const baseDimension = {
        use: dimensionState,
        reducers: dispatchedDimensionReducers,
        store: dimensionStore,
    };
    return baseDimension;
};
exports.createBaseDimension = createBaseDimension;
