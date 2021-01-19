"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeAsyncStatusAutomationState = exports.createAsyncStatusesDimension = void 0;
const createBaseDimension_1 = require("./createBaseDimension");
const types_1 = require("./types");
const getAsyncStatusInitialState = (asyncActions) => {
    const asyncStatuses = {};
    Object.keys(asyncActions).forEach((key) => {
        const typedKey = key;
        asyncStatuses[typedKey] = {
            status: types_1.asyncLifecycleStatuses.NO_CURRENT_CALL,
            previousStatus: types_1.asyncLifecycleStatuses.NO_CURRENT_CALL,
            isPending: false,
            hasError: false,
        };
    });
    return asyncStatuses;
};
const getAsyncStatusReducers = (state) => {
    return {
        setAsyncStatus: ({ callName, status }) => {
            const typedCallName = callName;
            return Object.assign(Object.assign({}, state), { [typedCallName]: Object.assign(Object.assign({}, state[typedCallName]), { status, previousStatus: state[typedCallName].status, isPending: status === types_1.asyncLifecycleStatuses.PENDING, hasError: status === types_1.asyncLifecycleStatuses.CALL_FAILURE }) });
        }
    };
};
const createAsyncStatusesDimension = (originalStoreKey, asyncActions, externalDependencies) => {
    const dimensionStoreKey = `${originalStoreKey}_Status`;
    const asyncStatusesDimensionInitialState = getAsyncStatusInitialState(asyncActions);
    const statusesDimension = createBaseDimension_1.createBaseDimension(dimensionStoreKey, () => asyncStatusesDimensionInitialState, () => getAsyncStatusReducers, externalDependencies);
    return statusesDimension;
};
exports.createAsyncStatusesDimension = createAsyncStatusesDimension;
const composeAsyncStatusAutomationState = (asyncActions, asyncStatusesDimension) => {
    const higherOrderAsyncActions = {};
    const { reducers } = asyncStatusesDimension;
    Object.keys(asyncActions).forEach((key) => {
        higherOrderAsyncActions[key] = (params) => {
            reducers.setAsyncStatus({ callName: key, status: types_1.asyncLifecycleStatuses.PENDING });
            return asyncActions[key](params)
                .then((result) => {
                reducers.setAsyncStatus({ callName: key, status: types_1.asyncLifecycleStatuses.CALL_SUCCESS });
                return result;
            })
                .catch((error) => {
                reducers.setAsyncStatus({ callName: key, status: types_1.asyncLifecycleStatuses.CALL_FAILURE });
                return error;
            })
                .finally(() => {
                reducers.setAsyncStatus({ callName: key, status: types_1.asyncLifecycleStatuses.NO_CURRENT_CALL });
            });
        };
    });
    return higherOrderAsyncActions;
};
exports.composeAsyncStatusAutomationState = composeAsyncStatusAutomationState;
