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
            console.log('res.data products-----------', res.data);
            this.setState({products: res.data, loading: false});
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