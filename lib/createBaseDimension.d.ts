import { BaseReducers, StringTheoryStore, AnyState, StateClosure, ReducersClosure, BaseDimension } from './types';
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
declare const createBaseDimension: <TState extends AnyState, TReducers extends BaseReducers<TState>, TExternalDependencies>(dimensionStoreKey: string, initialStateClosure: StateClosure<TState, TExternalDependencies>, reducersClosure: ReducersClosure<TState, TReducers, TExternalDependencies>, externalDependencies: TExternalDependencies, store?: StringTheoryStore<TState>) => BaseDimension<TState, TReducers>;
export { createBaseDimension };
