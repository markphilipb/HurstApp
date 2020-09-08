import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Store from './components/container/Store/Store';
import About from './components/container/About/About';
import Cart from './components/container/Cart/Cart';
import ProductPage from './components/container/ProductPage/ProductPage';
import SigninPage from './components/container/Signin/Signin';
import ProductForm from './components/container/ProductForm/ProductForm';
import Success from './components/presentational/Success';
import Cancel from './components/presentational/Cancel';
import OrderList from './components/container/OrderList/OrderList';

export default (
    <Switch>
        <Route exact path='/' component={Store} />
        <Route path='/about' component={About} />
        <Route path='/store' component={Store} />
        <Route path='/cart/:_id?' component={Cart} />
        <Route path='/product/:_id' component={ProductPage} />
        <Route path='/signin' component={SigninPage} />
        <Route path='/productform' component={ProductForm} />
        <Route path='/success' component={Success} />
        <Route path='/cancel' component={Cancel} />
        <Route path='/orders' component={OrderList} />
        <Route path='/api/create-checkout-session' />
    </Switch>
)