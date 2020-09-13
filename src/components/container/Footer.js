import React, { Component } from 'react';
 

class Footer extends Component {
    render() {
        return (
  //           <footer className="py-5 bg-dark">
  //   <div className="container">
  //     <p className="m-0 text-center text-white">Copyright &copy; The Hurst 2020</p>
  //   </div>
  // </footer>
  <div className="footer">
      <div className="container">
        
        <div className="row">
          <div className="col-12 text-center">
            <div className="social-icons">
              <a href="#"><span className="icon-facebook"></span></a>
              <a href="#"><span className="icon-twitter"></span></a>
              <a href="#"><span className="icon-youtube"></span></a>
              <a href="#"><span className="icon-instagram"></span></a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="copyright">
                <p>
                    Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart text-danger" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" >Colorlib</a>
                    </p>



            </div>
          </div>
        </div>
      </div>
    </div>
        )
    }
}
export default Footer;