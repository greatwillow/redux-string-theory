"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncLifecycleStatuses = void 0;
var asyncLifecycleStatuses;
(function (asyncLifecycleStatuses) {
    asyncLifecycleStatuses["NO_CURRENT_CALL"] = "NO_CURRENT_CALL";
    asyncLifecycleStatuses["TRIGGER_API_CALL"] = "TRIGGER_API_CALL";
    asyncLifecycleStatuses["PENDING"] = "PENDING";
    asyncLifecycleStatuses["CALL_SUCCESS"] = "CALL_SUCCESS";
    asyncLifecycleStatuses["CALL_FAILURE"] = "CALL_FAILURE";
})(asyncLifecycleStatuses = exports.asyncLifecycleStatuses || (exports.asyncLifecycleStatuses = {}));
