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

        //           <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      //   { isAuthenticated ? <div className="container">
      //     <a className="navbar-brand" href="/"><img src="imgs/hurst_logo.png" height="50" width="90" alt="hurst_logo"></img></a>
      //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      //       <span className="navbar-toggler-icon"></span>
      //     </button>
      //     <div className="collapse navbar-collapse" id="navbarResponsive">
      //       <ul className="navbar-nav ml-auto">
      //         <li className="nav-item">
      //           {/* <a className="nav-link" href="#">Home */}
      //           <a className="nav-link" href="/" onClick={() => this.linkFunc('/')}>Home
      //             {/* <span className="sr-only">(current)</span> */}
      //           </a>
      //         </li>
      //         <li className="nav-item">
      //         <a className="nav-link" href="/about" onClick={() => this.linkFunc('/about')}>About</a>
      //         </li>
      //         <li className="nav-item">
      //         <a className="nav-link" href="/store" onClick={() => this.linkFunc('/store')}>Store</a>
      //         </li>
      //         <li className="nav-item">
      //         <a className="nav-link" href="/cart" onClick={() => this.linkFunc('/cart')}>Cart</a>
      //         </li>
      //         <li className="nav-item">
      //           <a className="nav-link" href="/about">Contact</a>
      //         </li>
      //         <li className="nav-item">
      //           <a className="nav-link" href="/orders" onClick={() => this.linkFunc('/orders')}>Orders</a>
      //         </li> 


      //       </ul>
      //     </div>
      //   </div>

      //   :

      //   <div className="container">
      //     <a className="navbar-brand" href="/"><img src="imgs/hurst_logo.png" height="50" width="90" alt="hurst_logo"></img></a>
      //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      //       <span className="navbar-toggler-icon"></span>
      //     </button>
      //     <div className="collapse navbar-collapse" id="navbarResponsive">
      //       <ul className="navbar-nav ml-auto">
      //         <li className="nav-item">
      //           {/* <a className="nav-link" href="#">Home */}
      //           <a className="nav-link" href="/" onClick={() => this.linkFunc('/')}>Home
      //             {/* <span className="sr-only">(current)</span> */}
      //           </a>
      //         </li>
      //         <li className="nav-item">
      //         <a className="nav-link" href="/about" onClick={() => this.linkFunc('/about')}>About</a>
      //         </li>
      //         <li className="nav-item">
      //         <a className="nav-link" href="/store" onClick={() => this.linkFunc('/store')}>Store</a>
      //         </li>
      //         <li className="nav-item">
      //         <a className="nav-link" href="/cart" onClick={() => this.linkFunc('/cart')}>Cart</a>
      //         </li>
      //         <li className="nav-item">
      //           <a className="nav-link" href="/about">Contact</a>
      //         </li>

      //       </ul>
      //     </div>
      //   </div> }
      // </nav>
    
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
                <a href="/home" className="site-logo">
                  <img src="imgs/hurst_logo_black.png" height="100" width="150" alt="hurst_logo" className="img-fluid"></img>
                </a>
              </div>
              <a href="#" className="mx-auto d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black"><span
                className="icon-menu h3"></span></a>
            </div>
          </div>

          <div className="site-navbar py-2 js-sticky-header site-navbar-target d-none pl-0 d-lg-block" role="banner">

            <div className="container">
              <div className="d-flex align-items-center">

                <div className="mx-auto">
                  <nav className="site-navigation position-relative text-left" role="navigation">
                    <ul className="site-menu main-menu js-clone-nav mx-auto d-none pl-0 d-lg-block border-none">
                      <li><a href="/home" className="nav-link text-left" onClick={() => this.linkFunc('/home')}>Home</a></li>
                      <li><a href="/about" className="nav-link text-left" onClick={() => this.linkFunc('/about')}>About</a></li>
                      <li><a href="/store" className="nav-link text-left" onClick={() => this.linkFunc('/store')}>Store</a></li>                      <li><a href="/about" className="nav-link text-left" onClick={() => this.linkFunc('/about')}>About</a></li>
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
                  <a href="/home" className="site-logo">
                    <img src="imgs/hurst_logo_black.png" height="100" width="150" alt="hurst_logo" className="img-fluid"></img>
                  </a>
                </div>
                <a href="#" className="mx-auto d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black"><span
                  className="icon-menu h3"></span></a>
              </div>
            </div>

            <div className="site-navbar py-2 js-sticky-header site-navbar-target d-none pl-0 d-lg-block" role="banner">

              <div className="container">
                <div className="d-flex align-items-center">

                  <div className="mx-auto">
                    <nav className="site-navigation position-relative text-left" role="navigation">
                      <ul className="site-menu main-menu js-clone-nav mx-auto d-none pl-0 d-lg-block border-none">
                        <li><a href="/home" className="nav-link text-left" onClick={() => this.linkFunc('/home')}>Home</a></li>
                        <li><a href="/about" className="nav-link text-left" onClick={() => this.linkFunc('/about')}>About</a></li>
                        <li><a href="/store" className="nav-link text-left" onClick={() => this.linkFunc('/store')}>Store</a></li>                      <li><a href="/about" className="nav-link text-left" onClick={() => this.linkFunc('/about')}>About</a></li>
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
