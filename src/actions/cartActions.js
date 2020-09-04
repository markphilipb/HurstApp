// const { default: Axios } = require("axios");
import Axios from 'axios';
import Cookie from 'js-cookie';
const { CART_ADD_ITEM, CART_REMOVE_ITEM } = require("../constants/cartConstants");

const addToCart = (productId, size) => async (dispatch, getState) => {
    try{
        const { data } = await Axios.get("/api/products/" + productId);
        dispatch({type: CART_ADD_ITEM, payload: {
            product: data.product._id,
            name: data.product.name,
            image: data.product.image,
            price: data.product.price,
            countInStock: data.product.countInStock,
            countSmall: data.product.countSmall,
            countMedium: data.product.countMedium,
            countLarge: data.product.countLarge,
            countXL: data.product.countXL,
            size
            
        }});
        const {cart:{cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));

    }catch(error){

    }

}

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId});
    const {cart:{cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}


export { addToCart, removeFromCart };