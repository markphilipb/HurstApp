import React, { Component } from 'react';
import axios from 'axios';
import ProductCard from '../../presentational/ProductCard/ProductCard';
import Loader from '../../presentational/Loader/Loader';
import './Store.css';
import { withAuth0 } from "@auth0/auth0-react";


export class Store extends Component {
    
    constructor() {
        super();
        this.state ={
            products: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get('/api/products').then(res => {
            console.log('res.data products-----------', res.data);
            this.setState({products: res.data, loading: false});
        }).catch(err => console.log('Read all products Error-------', err));
    }

    render() {
        const { products, loading } = this.state;
        const { isAuthenticated } = this.props.auth0;

        if(!loading) {
            return (
                <div className='home container'>
                    { isAuthenticated && <div>
                        <a className="btn btn-primary new-product-btn" href="/productform">New Product</a>
                    </div> }
                    <div className='row'>
                        {products.length ? products.map(product => <ProductCard key={product._id} {...product} />) : null}
                    </div>
                </div>
            );
        } else {
            return <Loader />
        }
    }

}

export default withAuth0(Store);