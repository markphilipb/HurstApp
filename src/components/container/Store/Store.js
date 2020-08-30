import React, { Component } from 'react';
import axios from 'axios';
import ProductCard from '../../presentational/ProductCard/ProductCard';
import Loader from '../../presentational/Loader/Loader';
import './Store.css';



export default class Store extends Component {
    
    constructor() {
        super();
        this.state ={
            products: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get('/api/products').then(res => {
            //always have console.logs for debugging
            console.log('res.data products-----------', res.data);
            /////Set your loading to false, and products to the res.data, since we are doing res.send in our backend.
            this.setState({products: res.data, loading: false});
            //Each .then must have a .catch to catch errors.
        }).catch(err => console.log('Read all products Error-------', err));
    }

    render() {
        //Destruct the products, loading from state.
        const { products, loading } = this.state;
        //If it is done loading return html else return the loading indicator.
        if(!loading) {
            return (
                <div className='home container'>
                    <div className='row'>
                        {/* If hte products have data return products else return nothing using terinary statement */}
                        {products.length ? products.map(product => <ProductCard key={product._id} {...product} />) : null}
                    </div>
                </div>
            );
        } else {
            return <Loader />
        }
    }

}