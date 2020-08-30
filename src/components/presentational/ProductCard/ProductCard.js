import React from 'react';
//Import the css file for styling 
import './ProductCard.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

//Don't forget to pass props to a stateless component as a argument.
const ProductCard = (props) => {
    const { _id, name, price, description } = props;
    
    return (
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                  <Link to={'/product/'+ _id}>
                    <img class="card-img-top" src="http://placehold.it/700x400" alt=""></img>
                  </Link>
                        <div class="card-body">
                            <h4 class="card-title">
                                {/* <a href="/api/products/" id="prodId">{name}</a> */}
                                <Link to={'/product/'+ _id}>{name}</Link>
                            </h4>
                            <h5>{price}</h5>
                            <p class="card-text">{description}</p>
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">Open modal</button>

  <div class="modal fade" id="myModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
      
        <div class="modal-header">
          <h4 class="modal-title">{name}</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <div class="modal-body">
          {price}
        </div>
        
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>
                        </div>
                        {/* <div class="card-footer">
                            <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                        </div> */}
                </div>
            </div>
    );
};

export default ProductCard;