import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import './Navbar.css';
import { connect } from 'react-redux';
import '../../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../../assets/css/shop-homepage.css';
import { withAuth0 } from "@auth0/auth0-react";


export class Navbar extends Component {

  
    
    linkFunc(path) {
        this.props.history.push(path);
    }

    render() {
        const { isAuthenticated } = this.props.auth0;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    { isAuthenticated ? <div className="container">
      <a className="navbar-brand" href="/"><img src="imgs/hurst_logo.png" height="50" width="90" alt="hurst_logo"></img></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {/* <a className="nav-link" href="#">Home */}
            <a className="nav-link" href="/" onClick={() => this.linkFunc('/')}>Home
              {/* <span className="sr-only">(current)</span> */}
            </a>
          </li>
          <li className="nav-item">
          <a className="nav-link" href="/about" onClick={() => this.linkFunc('/about')}>About</a>
          </li>
          <li className="nav-item">
          <a className="nav-link" href="/store" onClick={() => this.linkFunc('/store')}>Store</a>
          </li>
          <li className="nav-item">
          <a className="nav-link" href="/cart" onClick={() => this.linkFunc('/cart')}>Cart</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">Contact</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/cart" onClick={() => this.linkFunc('/cart')}>Orders</a>
          </li> 

          
        </ul>
      </div>
    </div>

    :

    <div className="container">
      <a className="navbar-brand" href="/"><img src="imgs/hurst_logo.png" height="50" width="90" alt="hurst_logo"></img></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {/* <a className="nav-link" href="#">Home */}
            <a className="nav-link" href="/" onClick={() => this.linkFunc('/')}>Home
              {/* <span className="sr-only">(current)</span> */}
            </a>
          </li>
          <li className="nav-item">
          <a className="nav-link" href="/about" onClick={() => this.linkFunc('/about')}>About</a>
          </li>
          <li className="nav-item">
          <a className="nav-link" href="/store" onClick={() => this.linkFunc('/store')}>Store</a>
          </li>
          <li className="nav-item">
          <a className="nav-link" href="/cart" onClick={() => this.linkFunc('/cart')}>Cart</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">Contact</a>
          </li>
       
        </ul>
      </div>
    </div> }
  </nav>
           
        );
    }
}

export default withRouter(withAuth0(connect()(Navbar)));
