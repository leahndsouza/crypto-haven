import { createStore, applyMiddleware, compose, combineReducers } from "redux";

// Reducers
import cryptoReducer from './reducers/crypto';


export function configureStore() {
  const composeEnhancers =
    process.env.NODE_ENV === "development"
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : null 
      || 
    compose;

  const rootReducer = combineReducers({
    stats: cryptoReducer,
  });


  const store = createStore(
    rootReducer,
    composeEnhancers()
  );


  return store;
}
