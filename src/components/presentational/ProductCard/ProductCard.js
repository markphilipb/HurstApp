import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';


const ProductCard = (props) => {
  const { _id, name, price, image,
     } = props;

  return (
    // <div className="col-lg-4 col-md-6 mb-4">
    //   <div className="card h-100">
    //     <Link to={'/product/' + _id}>
    //       <img className="card-img-top" src={image} alt=""></img>
    //     </Link>
    //     <div className="card-body">
    //       <h4 className="card-title">
    //         <Link to={'/product/' + _id}>{name}</Link>
    //       </h4>
    //       <h5>{price}</h5>
    //       <p className="card-text">{description}</p>
    //       <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Open modal</button>

    //       <div className="modal fade" id="myModal">
    //         <div className="modal-dialog modal-lg">
    //           <div className="modal-content">

    //             <div className="modal-header">
    //               <h4 className="modal-title">{name}</h4>
    //               <button type="button" className="close" data-dismiss="modal">&times;</button>
    //             </div>

    //             <div className="modal-body">
    //               {price}
    //             </div>

    //             <div className="modal-footer">
    //               <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
    //             </div>

    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //   </div>
    // </div>
    <div className="col-lg-4 mb-5 col-md-6">
    <div className="product-card container">

      <div className="">

        <Link to={'/product/' + _id}>
          <img className="img-fluid" src={image} alt=""></img>
        </Link>


        <div>
          <h3 className="data product-name">
            <Link className="product-card label" to={'/product/' + _id}>{name}</Link>
          </h3>
          <h3 className="data price">
          <span className="price">${price}</span>
          </h3>
        </div>



      </div>
    </div>
    </div>
  );
};

export default ProductCard;