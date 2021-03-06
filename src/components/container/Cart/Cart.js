import React, { useEffect } from 'react';
import './Cart.css';
import { addToCart, removeFromCart } from '../../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

function Cart(props) {
    const cart = useSelector(state => state.cart);
    const { cartItems} = cart;
    const productId = props.match.params._id;
    const size = props.location.search ? props.location.search.split("=")[1]: "lol";
    const stripePromise = loadStripe('pk_test_51HNPzjEPPZ2eZwStpMCckkhojI4KW8ZB3T8ZSTlhVkchmosNaxbWSS14XTXbrykwVSuiXHXcqGUhSLhjR4tKicDW00ppx7MBIt');
    const dispatch = useDispatch();


    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }


    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, size));
        }
    }, [dispatch, productId, size])


    const checkoutHandler = async (e) => {
        const stripe = await stripePromise;
        let ret = [];
        
        for(let i = 0; i < cart.cartItems.length; i++){ 
            const prod =  cart.cartItems[i];
            let namep = prod.name;
            let price = prod.price * 100;
            let obj = {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: namep,
                    },
                    unit_amount: price,

                },
                quantity: 1,                
            }

            ret = [...ret, obj]

        }

    // Call your backend to create the Checkout Session
   
    axios.post('/api/create-checkout-session', {
        cartDetails: ret,
        itemId: cart,
      })
      .then(async (response)  => {
          
        const session = await response.data;
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
      
          if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
            console.log(result.error.message);
          }

      }, (error) => {
        console.log(error);
      });

    }


    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3 className="font-style">Shopping Cart</h3>
                    <div className="font-style">Price</div>
                </li>
                {
                    cartItems.length === 0 ?
                        <div className="font-style cart-empty">
                            Cart Empty
                        </div>
                        :
                        cartItems.map(item =>
                            <div className="cart-item" key={item.product}>
                                <div className="container">
                                    <img className="cart-image" src={item.image} alt="product pic" />
                                </div>
                                <div >
                                    <div className="cart-name">
                                        <Link className="text-color" to={"/product/" + item.product}>{item.name}</Link>
                                    </div>
                                    <div className="side">
                                        Size: <select className="select-value" value={item.size} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                            {item.countSmall>0 ? <option>S</option>
                                            : <option>Out of stock!</option>}
                                            {item.countMedium>0 ? <option>M</option>
                                            : <option>Out of stock!</option>}
                                            {item.countLarge>0 ? <option>L</option>
                                            : <option>Out of stock!</option>}
                                            {item.countXL>0 ? <option>XL</option>
                                            : <option>Out of stock!</option>}
                                        </select>
                                        <button type="button" className="button btn btn-danger style-button" onClick={() => removeFromCartHandler(item.product)}>Remove</button>
                                        <div className="cart-price">
                                    ${item.price}
                                </div>
                                    </div>
                                </div>
                                
                            </div>
                        )
                }
            </ul>

        </div>
        <div className="cart-action">
                <h3 className="font-style proceed">
                    Subtotal ( {cartItems.length} items)
                :
                $ {cartItems.reduce((a, c) => a + c.price, 0)}
                </h3>
                <button type="button" onClick={checkoutHandler} className="button btn btn-dark style-button proceed-button" disabled={cartItems.length===0}>Proceed to checkout</button>
        </div>
    </div>
}

export default Cart;