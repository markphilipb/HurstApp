import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import './Navbar.css';
import { connect } from 'react-redux';
import '../../../assets/vendor/bootstrap/css/bootstrap.min.css';
// import '../../../assets/css/shop-homepage.css';
import { withAuth0 } from "@auth0/auth0-react";


export class Navbar extends Component {



  linkFunc(path) {
    this.props.history.push(path);
  }

  render() {
    const { isAuthenticated } = this.props.auth0;
    return (    
      isAuthenticated ? (<div>

        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle"></span>
            </div>
          </div>
          <div className="site-mobile-menu-body"></div>
        </div>

        <div className="header-top">

          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 text-center">
                <a href="/store" className="site-logo">
                  <img src="/imgs/hurst_logo_black.png" height="100" width="150" alt="logo" className="img-fluid"></img>
                </a>
              </div>
              <a href="/" className="mx-auto d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black"><span
                className="icon-menu h3"></span></a>
              {/* <a href="#" className="mx-auto d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black"><span
                className="icon-menu h3"></span></a> */}
            </div>
          </div>

          <div className="site-navbar py-2 js-sticky-header site-navbar-target d-none pl-0 d-lg-block" role="banner">

            <div className="container">
              <div className="d-flex align-items-center">

                <div className="mx-auto">
                  <nav className="site-navigation position-relative text-left" role="navigation">
                    <ul className="site-menu main-menu js-clone-nav mx-auto d-none pl-0 d-lg-block border-none">
                    <li><a href="/store" className="nav-link text-left" onClick={() => this.linkFunc('/store')}>Shop</a></li>                    
                        <li><a href="/about" className="nav-link text-left" onClick={() => this.linkFunc('/about')}>About</a></li>
                        <li><a href="/cart" className="nav-link text-left" onClick={() => this.linkFunc('/cart')}>Cart</a></li>
                      <li><a href="/orders" className="nav-link text-left" onClick={() => this.linkFunc('/orders')}>Orders</a></li>

                    </ul>
                  </nav>

                </div>

              </div>
            </div>

          </div>
        </div>



      </div>) :
        <div>

          <div className="site-mobile-menu site-navbar-target">
            <div className="site-mobile-menu-header">
              <div className="site-mobile-menu-close mt-3">
                <span className="icon-close2 js-menu-toggle"></span>
              </div>
            </div>
            <div className="site-mobile-menu-body"></div>
          </div>

          <div className="header-top">

            <div className="container">
              <div className="row align-items-center">
                <div className="col-12 text-center">
                  <a href="/store" className="site-logo">
                    <img src="/imgs/hurst_logo_black.png" height="100" width="150" alt="hurst_logo" className="img-fluid"></img>
                  </a>
                </div>
                <a href="/" className="mx-auto d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black"><span
                  className="icon-menu h3"></span></a>
              </div>
            </div>

            <div className="site-navbar py-2 js-sticky-header site-navbar-target d-none pl-0 d-lg-block" role="banner">

              <div className="container">
                <div className="d-flex align-items-center">

                  <div className="mx-auto">
                    <nav className="site-navigation position-relative text-left" role="navigation">
                      <ul className="site-menu main-menu js-clone-nav mx-auto d-none pl-0 d-lg-block border-none">
                      <li><a href="/store" className="nav-link text-left" onClick={() => this.linkFunc('/store')}>Shop</a></li>                    
                        <li><a href="/about" className="nav-link text-left" onClick={() => this.linkFunc('/about')}>About</a></li>
                        <li><a href="/cart" className="nav-link text-left" onClick={() => this.linkFunc('/cart')}>Cart</a></li>

                      </ul>
                    </nav>

                  </div>

                </div>
              </div>

            </div>
          </div>



        </div>


    );
  }
}

export default withRouter(withAuth0(connect()(Navbar)));
