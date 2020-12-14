import {createStore,applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk'; 
import BasicReducer from './reducer'
const rootReducer = combineReducers({
    responseData:BasicReducer
})
const  store = createStore(rootReducer,applyMiddleware(thunk))

export default store  