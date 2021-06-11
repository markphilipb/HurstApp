import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './ProductPage.css';


function ProductPage(props) {
    const [product, setProduct] = useState({});
    const [size, setSize] = useState("S")

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/products/" + props.match.params._id);
            setProduct(data.product);
        }
        fetchData();
        return () => {

        };
    }, [props.match.params._id]);


    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params._id + "?size=" + size);
    }


    return (
        // <div className="container">
        //     <div className="row">
        //     <div>
        //         <Link to="/store">Back</Link>
        //     </div>
        //         <div className="col-lg-9">
        //         <div className="product container">
        //             <div className="card mt-4">
        //                 <img className="card-img-top img-fluid" src={product.image} alt="" height="900px" width="1000px"></img>
        //                 <div className="card-body">
        //                     <h3 className="card-title">{product.name}</h3>
        //                     <h4>{product.price}</h4>
        //                     <p className="card-text">{product.description}</p>
        //                     <div className="details-action">
        //                         <ul>
        //                             <li>
        //                                 {/* Qty: <select value={qty} onChange={(e) => setQty(e.target.value)}>
        //                                     {[...Array(product.countInStock).keys()].map(x =>
        //                                         <option key={x + 1}>{x + 1}</option>)}
        //                                 </select> */}
        //                                 Size: <select value={size} onChange={(e) => setSize(e.target.value)}>
        //                                     {product.countSmall>0 ? <option>S</option>
        //                                     : <option>Out of stock!</option>}
        //                                     {product.countMedium>0 ? <option>M</option>
        //                                     : <option>Out of stock!</option>}
        //                                     {product.countLarge>0 ? <option>L</option>
        //                                     : <option>Out of stock!</option>}
        //                                     {product.countXL>0 ? <option>XL</option>
        //                                     : <option>Out of stock!</option>}
        //                                 </select>
        //                             </li>
        //                             <li>
        //                                 {product.countInStock>0 ? <button onClick={handleAddToCart} type="button" className="btn btn-primary">Add to cart</button>
        //                                 : <div>Out of stock!</div>}
        //                             </li>
        //                         </ul>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         </div>
        //     </div>

        // </div>
        <div>      
            
            {/* <div className="back-btn">
        <Link className="btn btn-secondary" to="/store">Back</Link>
    </div> */}
            <div className="site-section mt-5 section">
            {/* <div className="section"> */}

            
                <div className="container">
                
                    <div className="row">
                    
                        <div className="col-lg-6">
                            <img src={product.image} alt="product_image" className="img-fluid"></img>

                        </div>
                        <div className="col-lg-5 ml-auto">
                            <h2 className="item-name">{product.name}</h2>

                            <div className="mb-5">
                                <div className="input-group mb-3">
                                    <div className="details-action">
                                        <ul className="select-size">
                                            <li>

                                                Size: <select value={size} onChange={(e) => setSize(e.target.value)}>
                                                    {product.countSmall > 0 ? <option>S</option>
                                                        : <option>Out of stock!</option>}
                                                    {product.countMedium > 0 ? <option>M</option>
                                                        : <option>Out of stock!</option>}
                                                    {product.countLarge > 0 ? <option>L</option>
                                                        : <option>Out of stock!</option>}
                                                    {product.countXL > 0 ? <option>XL</option>
                                                        : <option>Out of stock!</option>}
                                                </select>
                                            </li>
                                            <li className="add-cart">
                                                {product.countInStock > 0 ? <button onClick={handleAddToCart} type="button" className="btn btn-dark">Add to cart</button>
                                                    : <div>Out of stock!</div>}
                                            </li>
                                        </ul>
                                    </div>
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