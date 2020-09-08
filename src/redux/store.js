// import reducer from './reducer';
// //import createStore that will create a store from redux. 
// import { createStore } from 'redux';

// //Export the reducer with redux devtools 
// export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {cartReducer} from '../reducers/cartReducers'
import Cookie from 'js-cookie';
import { userSigninReducer } from '../reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer } from '../reducers/orderReducers';


const cartItems = Cookie.getJSON("cartItems") || []


const initialState = {cart: { cartItems }};
const reducer = combineReducers({
    cart: cartReducer,
    userSignin: userSigninReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;