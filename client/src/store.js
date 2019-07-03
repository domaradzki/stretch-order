import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import orders from './ducks/orders'
import data from './ducks/data'
import interfaceMenu from './ducks/interfaceMenu'

const rootReducer = combineReducers({
    orders,
    data,
    interfaceMenu
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;