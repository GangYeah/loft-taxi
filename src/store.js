import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleWare from 'redux-saga';
import { rootReducer, rootSaga } from "./modules";

const sagaMiddleware = createSagaMiddleWare();

const createAppStore = () => {
  const initialState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {}


  const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(sagaMiddleware)
  ));

  store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  })

  sagaMiddleware.run(rootSaga);
  return store;
}
export default createAppStore;
