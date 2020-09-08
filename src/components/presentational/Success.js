import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../actions/cartActions';


function Success(props) {
  const cart = useSelector(state => state.cart);
  const { cartItems} = cart;
  const [body, setBody] = useState({});
  const dispatch = useDispatch();

  console.log(cart.cartItems);

  useEffect(() => {
    console.log("cart: ", cart.cartItems);
    cart.cartItems.map((item) => {
      dispatch(removeFromCart(item.product));
    }); 
}, [])

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