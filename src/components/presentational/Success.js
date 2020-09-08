import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../actions/cartActions';


function Success(props) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    // cart.cartItems.map((item) => {
    //   dispatch(removeFromCart(item.product));
    // });
    cart.cartItems.forEach(item => {
      dispatch(removeFromCart(item.product));
    }); 
}, [cart.cartItems, dispatch])

  return (
    <div>
        <h1>Thanks for your order!</h1>
        <p>
        We appreciate your business!
        If you have any questions, please email
        <a href="mailto:hurstlimited@gmail.com"> hurstlimited@gmail.com</a>.
        </p>
    </div>
  );
}

export default Success;