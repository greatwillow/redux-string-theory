import { DimensionDefinitions, DimensionParameters } from './types';
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
declare const createInterstellarDimension: <TDimensionDefinitions extends DimensionDefinitions<any, any, any, any, any>, TExternalDependencies>(dimensionParamers: DimensionParameters<TDimensionDefinitions, TExternalDependencies>) => TDimensionDefinitions["dimension"];
export { createInterstellarDimension };
