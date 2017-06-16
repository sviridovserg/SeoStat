import { combineReducers } from 'redux'
import params from './paramsReducer';
import result from './resultReducer';
import errors from './errorsReducer';

const app = combineReducers({ params, result, errors });

export default app;

