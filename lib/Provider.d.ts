/// <reference types="react" />
import { Provider as ReactReduxProvider } from 'react-redux';
import { ProviderProps } from './types';
declare const Provider: ({ store, context, children, }: ProviderProps) => import("react").CElement<import("react-redux").ProviderProps<import("redux").Action<any>>, ReactReduxProvider<import("redux").Action<any>>>;
export { Provider };
