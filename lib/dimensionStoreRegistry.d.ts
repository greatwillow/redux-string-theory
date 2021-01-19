import { AnyState, StringTheoryStore, DimensionStore } from './types';
declare const createDimensionStore: <TState extends AnyState>(store: StringTheoryStore<TState>, storeKey: string) => DimensionStore<TState>;
export { createDimensionStore };
