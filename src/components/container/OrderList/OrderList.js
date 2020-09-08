import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';


function ProductForm(props) {
  const [orderList, setOrderList] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        axios.get('/api/orders').then(res => {
            console.log('res.data orders-----------', res.data);
        setOrderList(res.data);
        }).catch(err => console.log('Read all orders Error-------', err));
    }, [])


  const deleteHandler = async (order) => {
    const token = await getAccessTokenSilently();
    const body = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
    
    axios.delete('/api/orders/' + order._id, body)
      .then(res => {
        
      })
    
      window.location.reload(false);
  };


  return (
 
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Shipping</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.shipping.name + "\n"}</td>
                <td>{order.shipping.name + "\n" + order.shipping.address + "\n" + order.shipping.city + ", " + order.shipping.state + ", " + order.shipping.postalCode + "\n" + order.shipping.country}</td>
                <td>{order.totalPrice / 100}</td>
                <td>{order.isPaid}</td>
                <td>
                   {/* <button className="button" onClick={() => openModalUpdate(product)}>
                    Edit
                  </button>{' '}  */}
                   <button
                    className="button"
                    onClick={() => deleteHandler(order)}
                  >
                    Delete
                  </button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    
  );
}
export default withAuthenticationRequired(ProductForm, {
    // Show a message while the user waits to be redirected to the login page.
    onRedirecting: () => (<div>Redirecting you to the login page...</div>)
  });