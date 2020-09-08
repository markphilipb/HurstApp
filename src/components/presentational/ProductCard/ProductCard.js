import React from 'react';
//Import the css file for styling 
import './ProductCard.css';
import { Link } from 'react-router-dom';

//Don't forget to pass props to a stateless component as a argument.
const ProductCard = (props) => {
    const { _id, name, price, image, description } = props;
    
    return (
            <div className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100">
                  <Link to={'/product/'+ _id}>
                    <img className="card-img-top" src={image} alt=""></img>
                  </Link>
                        <div className="card-body">
                            <h4 className="card-title">
                                {/* <a href="/api/products/" id="prodId">{name}</a> */}
                                <Link to={'/product/'+ _id}>{name}</Link>
                            </h4>
                            <h5>{price}</h5>
                            <p className="card-text">{description}</p>
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Open modal</button>

  <div className="modal fade" id="myModal">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
      
        <div className="modal-header">
          <h4 className="modal-title">{name}</h4>
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        
        <div className="modal-body">
          {price}
        </div>
        
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>
                        </div>
                        {/* <div className="card-footer">
                            <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                        </div> */}
                </div>
            </div>
    );
};

export default ProductCard;