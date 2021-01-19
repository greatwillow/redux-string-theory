import { StoreEnhancer } from 'redux';
import { Reducers, StringTheoryStore, AnyState } from './types';
/**
 * @returns the current or newly created store
 */
declare const getStore: <TState>() => StringTheoryStore<TState>;
/**
 * Call setStore to provide your own store for redux-string-theory to use. You'll need to use this if you want to use middleware.
 *
 * @param store store to set in the store-registry
 *
 * @returns the current store
 */
declare const setStore: <TState>(initialStore: StringTheoryStore<TState>) => StringTheoryStore<TState> | null;
/**
 * Creates a Redux store that holds the state tree.
 *
 * @param initialReducers An object whose values correspond to different reducer functions that already exist in the app.
 *
 * @param enhancer An optional extension for adding third-party capabilities such as middleware and time travel
 *
 * @returns A Redux store that lets you read the state, dispatch actions and subscribe to changes.
 */
declare const createStore: <TState extends AnyState>(initialReducers?: Reducers<TState> | undefined, enhancer?: StoreEnhancer<any, {}> | undefined) => StringTheoryStore<TState>;
export { getStore, setStore, createStore, };
