import { combineReducers } from "redux";
import authReducer from "./auth";
import cardReducer from "./card";

export default combineReducers({ auth: authReducer, card: cardReducer });
