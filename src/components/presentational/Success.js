import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


function Success(props) {
  const cart = useSelector(state => state.cart);
  const { cartItems} = cart;
  const [body, setBody] = useState({});
  console.log(cart.cartItems);

  useEffect(() => {
    // const updateData = async () => {
    //   for(let i = 0; i < cart.cartItems.length; i++){ 
    //     const id = cart.cartItems[i].product;
        
    //     if(cart.cartItems[i].size === "S"){
    //       setBody({ countSmall: cart.cartItems.countSmall - 1 });
    //     }
    //     else if(cart.cartItems[i].size === "M"){
    //       setBody({ countMedium: cart.cartItems.countMedium - 1 });
    //     }
    //     else if(cart.cartItems[i].size === "L"){
    //       setBody({ countLarge: cart.cartItems.countLarge - 1 });
    //     }
    //     else if(cart.cartItems[i].size === "XL"){
    //       setBody({ countXL: cart.cartItems.countXL - 1 });
    //     }
    //     console.log(cart.cartItems[i].product);
    //     await axios.put('api/products/update/' + id, body).then((response) => {
    //       console.log(response);
    //     }, (error) => {
    //       console.log(error);
    //     });
    //   }
    // }
    
}, [])

  return (
    <div>
        <h1>Thanks for your order!</h1>
        <p>
        We appreciate your business!
        If you have any questions, please email
        <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
    </div>
  );
}

export default Success;