import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { authMiddleware, /*fetchCardMiddleware*/ } from "./middlewares";

const createAppStore = () => {
    const initialState = localStorage.getItem('reduxState') 
                       ? JSON.parse(localStorage.getItem('reduxState'))
                       : {}
    const store = createStore(rootReducer, initialState, applyMiddleware(authMiddleware, /*fetchCardMiddleware*/));
    store.subscribe(()=>{
        localStorage.setItem('reduxState', JSON.stringify(store.getState()))
      })
    return store;
}
export default createAppStore;
