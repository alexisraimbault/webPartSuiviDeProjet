import newReducer from './newManager';
import activeReducer from './activeManager';
import resolvedReducer from './resolvedManager';
import closedReducer from './closedManager';

import {combineReducers} from 'redux';

const allReducers = combineReducers({
    new : newReducer,
    active : activeReducer,
    resolved : resolvedReducer,
    closed : closedReducer
});

export default allReducers;