import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import './Navbar.css';
import { connect } from 'react-redux';
import '../../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../../assets/css/shop-homepage.css';


export class Navbar extends Component {
    
    linkFunc(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
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
            <a className="nav-link" href="#">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
            // <div className='nav container'>
            //     <div className='desktop-nav'>
                    // <p className="nav-link" onClick={() => this.linkFunc('/')}>Home</p>
                    // <p className="nav-link" onClick={() => this.linkFunc('/about')}>About</p>
                    // <p className="nav-link" onClick={() => this.linkFunc('/cart')}>Cart</p>
            //     </div>
            // </div>
        );
    }
}

export default withRouter(connect()(Navbar));
