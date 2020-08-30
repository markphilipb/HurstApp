import React from 'react';
import axios from 'axios';
import { useState, useReducer, useEffect } from 'react';
import productReducers from '../../../reducers/productReducers';
import initialState from '../../../reducers/productReducers';
import { useDispatch } from 'react-redux';
import './ProductPage.css';
import { withRouter, Link } from 'react-router-dom';


function ProductPage(props) {
    // fetch('http://localhost:3000/api/products/' + props.match.params._id)
    // .then((res) => res.json())
    // .then((data) => {
    //         console.log(data)
    //         // var base64Flag = 'data:image/jpeg;base64,';
    //     // var imageStr = this.arrayBufferToBase64(data.img.data.data);
    //     // this.setState({
    //     //     img: base64Flag + imageStr
    //     // })
    // })

    // const [product, setProduct] = useState({});
    const [product, setProduct] = useState({});
    const dispatch = useDispatch();

    // axios.get('http://localhost:3000/api/products/' + props.match.params._id).then(res => {
    //     //always have console.logs for debugging
    //     setProduct(res.data.product);
    //     dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: data });
    //     /////Set your loading to false, and products to the res.data, since we are doing res.send in our backend.
    //     //Each .then must have a .catch to catch errors.
    // }).catch(err => console.log('Read all products Error-------', err));

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get("/api/products/" + props.match.params._id);
            setProduct(data.product);
        }
        fetchData();
        return () => {

        };
    }, [])

    // useEffect(() => {
    //     let mounted = true;
    //     if (product) {
    //         dispatch({ type: "FETCH_PRODUCT" });
    //         if (mounted) {
    //             axios.get('http://localhost:3000/api/products/' + props.match.params._id).then(res => {
    //                 //always have console.logs for debugging
    //                 // setProduct(res.data.product);
    //                 setProduct(res.data.product);
    //                 dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: res });
    //                 /////Set your loading to false, and products to the res.data, since we are doing res.send in our backend.
    //                 //Each .then must have a .catch to catch errors.
    //             }).catch(err => console.log('Read all products Error-------', err));
    //         }
    //     } else {
    //         dispatch({ type: "RESET" });
    //     }
    //     return () => mounted = false;

    // }, [product]);


    return (
        <div class="container">
            <div class="row">
            <div>
                <Link to="/store">Back</Link>
            </div>
                <div class="col-lg-9">
                <div class="product container">
                    <div class="card mt-4">
                        <img class="card-img-top img-fluid" src="http://placehold.it/900x400" alt="" height="900px" width="1000px"></img>
                        <div class="card-body">
                            <h3 class="card-title">{product.name}</h3>
                            <h4>{product.price}</h4>
                            <p class="card-text">{product.description}</p>
                            <div class="details-action">
                                <ul>
                                    <li>
                                        Qty: <select>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </li>
                                    <li>
                                        <button type="button" class="btn btn-primary">Add to cart</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>

        </div>
    )
}

export default ProductPage;