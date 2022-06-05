import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import loginReducer from "./reducer/loginReducer"
import thunk from "redux-thunk"
import pageReducer from "./reducer/pagesReducer"
const rootReducer = combineReducers({
    login: loginReducer,
    page: pageReducer,
})

const composeEnhencer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhencer(applyMiddleware(thunk)));