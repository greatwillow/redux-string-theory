"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const storeRegistry_1 = require("./storeRegistry");
const Provider = ({ store = storeRegistry_1.getStore(), context, children, }) => react_1.createElement(react_redux_1.Provider, { store, context }, children);
exports.Provider = Provider;
