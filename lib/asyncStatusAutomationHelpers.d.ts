import { AsyncActions, AsyncStatusesState, AsyncStatusReducers, BaseDimension } from './types';
declare const createAsyncStatusesDimension: <TAsyncActions extends AsyncActions, TExternalDependencies>(originalStoreKey: string, asyncActions: TAsyncActions, externalDependencies: TExternalDependencies) => BaseDimension<AsyncStatusesState<TAsyncActions>, AsyncStatusReducers<AsyncStatusesState<TAsyncActions>>>;
declare const composeAsyncStatusAutomationState: <TAsyncActions extends AsyncActions>(asyncActions: TAsyncActions, asyncStatusesDimension: BaseDimension<AsyncStatusesState<TAsyncActions>, AsyncStatusReducers<AsyncStatusesState<TAsyncActions>>>) => TAsyncActions;
export { createAsyncStatusesDimension, composeAsyncStatusAutomationState };
