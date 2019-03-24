import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import orders from './ducks/orders'

const rootReducer = combineReducers({
    orders
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  //console.log("Current state: ", store.getState());
});

export default store;