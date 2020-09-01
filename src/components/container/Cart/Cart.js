// import React, { Component } from 'react';
// //import the ProductCard component to display what is in the cart.
// import ProductCard from '../../presentational/ProductCard/ProductCard';
// //import the css file for styling
// import './Cart.css';
// //Define sample data for now to display in your cart.
// const sampleCartData = [
//     { name: 'Test 1', description: 'Test Product 1', price: 20, id: 1 },
//     { name: 'Test 2', description: 'Test Product 2', price: 10, id: 2 },
//     { name: 'Test 3', description: 'Test Product 3', price: 30, id: 3 }
// ]
// export default class Cart extends Component {
//     render() {
//         return (
//             <div className='cart container'>
//                 <div className='cart-info container'>
//                     <h2>Your Cart!</h2>
//                     <div className='cart-items'>
//                         {sampleCartData.map(product => <ProductCard key={product.id} {...product} />)}
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

import React, { useEffect } from 'react';
import './Cart.css';
import { addToCart, removeFromCart } from '../../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Cart(props) {
    const cart = useSelector(state => state.cart);
    const { cartItems} = cart;
    const productId = props.match.params._id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [])

    const checkoutHandler = () => {
        // props.history.push()
    }


    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>Shopping Cart</h3>
                    <div>Price</div>
                </li>
                {
                    cartItems.length === 0 ?
                        <div>
                            Cart Empty
                        </div>
                        :
                        cartItems.map(item =>
                            <div key={item.product}>
                                <div className="cart-image">
                                    <img src={item.image} alt="product pic" />
                                    {console.log(item)}
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/product/" + item.product}>{item.name}</Link>
                                    </div>
                                    <div>
                                        Qty:
                                        <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map(x =>
                                                <option key={x + 1} value={x + 1}>{x+1}</option>)}
                                        </select>
                                        <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)}>Remove</button>
                                    </div>
                                </div>
                                <div className="cart-price">
                                    ${item.price}
                                </div>
                            </div>
                        )
                }
            </ul>

        </div>
        <div className="cart-action">
                <h3>
                    Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
                :
                $ {cartItems.reduce((a, c) => a + c.price*c.qty, 0)}
                </h3>
                <button onClick={checkoutHandler} className="button primary" disabled={cartItems.length===0}>Proceed to checkout</button>
        </div>
    </div>
}

export default Cart;