import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Store from './components/container/Store/Store';
import About from './components/container/About/About';
import Cart from './components/container/Cart/Cart';
import ProductPage from './components/container/ProductPage/ProductPage';

export default (
    <Switch>
        <Route exact path='/' component={Store} />
        <Route path='/about' component={About} />
        <Route path='/store' component={Store} />
        <Route path='/cart' component={Cart} />
        <Route path='/product/:_id' component={ProductPage} />
        {/* <Route path='/admin' component={Admin} /> */}
    </Switch>
)