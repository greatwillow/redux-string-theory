"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = exports.setStore = exports.getStore = void 0;
const redux_1 = require("redux");
let store;
/**
 * @returns the current or newly created store
 */
const getStore = () => {
    if (store)
        return store;
    store = createStore();
    return store;
};
exports.getStore = getStore;
/**
 * Call setStore to provide your own store for redux-string-theory to use. You'll need to use this if you want to use middleware.
 *
 * @param store store to set in the store-registry
 *
 * @returns the current store
 */
const setStore = (initialStore) => {
    if (store != null) {
        console.warn('Store is already initialized. Call setStore before the first getStore. This call will be ignored.');
        return null;
    }
    if (typeof initialStore.injectReducer !== 'function')
        throw new Error('Store must support .injectReducer');
    store = initialStore;
    return store;
};
exports.setStore = setStore;
/**
 * Creates a Redux store that holds the state tree.
 *
 * @param initialReducers An object whose values correspond to different reducer functions that already exist in the app.
 *
 * @param enhancer An optional extension for adding third-party capabilities such as middleware and time travel
 *
 * @returns A Redux store that lets you read the state, dispatch actions and subscribe to changes.
 */
const createStore = (initialReducers, enhancer) => {
    if (typeof initialReducers !== 'object')
        throw new Error('initialReducers should be an object suitable to be passed to combineReducers');
    const reducers = Object.assign(Object.assign({}, initialReducers), { _stub_: (s) => s || 0 });
    const store = redux_1.createStore(redux_1.combineReducers(reducers), enhancer);
    store.injectReducer = (key, reducer) => {
        if (reducers[key])
            console.warn(`injectReducer: replacing reducer for key '${key}'`);
        reducers[key] = reducer;
        store.replaceReducer(redux_1.combineReducers(reducers));
    };
    Object.keys(reducers).forEach((key) => {
        if (key !== '_stub_')
            store.injectReducer(key, reducers[key]);
    });
    return store;
};
exports.createStore = createStore;
