import React, { useEffect, useState } from 'react';
import './ProductForm.css';
import axios from 'axios';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';


function ProductForm(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [countSmall, setCountSmall] = useState('');
  const [countMedium, setCountMedium] = useState('');
  const [countLarge, setCountLarge] = useState('');
  const [countXL, setCountXL] = useState('');
  // const [uploading, setUploading] = useState(false);
  const [productList, setProductList] = useState([]);

  const { getAccessTokenSilently } = useAuth0();

  
  useEffect(() => {
    axios.get('/api/products').then(res => {
      console.log('res.data products-----------', res.data);
      setProductList(res.data);
    }).catch(err => console.log('Read all products Error-------', err));
  }, [])


  const updateClick = async (e) => {
    const token = await getAccessTokenSilently();

    setIsUpdate(false);
    e.preventDefault();
    axios.put('/api/products/' + id, {
      _id: id,
      name: name,
      price: price,
      image: image,
      countInStock: countInStock,
      countSmall: countSmall,
      countMedium: countMedium,
      countLarge: countLarge,
      countXL: countXL,

    }, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    setModalVisible(false);
    window.location.reload(false);
  }


  const openModalUpdate = (product) => {
    setIsUpdate(true);
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setCountInStock(product.countInStock);
    setCountSmall(product.countSmall);
    setCountMedium(product.countMedium);
    setCountLarge(product.countLarge);
    setCountXL(product.countXL);
  };

  const openModalCreate = (product) => {
    setIsUpdate(false);
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setCountInStock(product.countInStock);
    setCountSmall(product.countSmall);
    setCountMedium(product.countMedium);
    setCountLarge(product.countLarge);
    setCountXL(product.countXL);
  };

  const submitHandler = async (e) => {
    const token = await getAccessTokenSilently();
    e.preventDefault();
    axios.post('/api/products', {
      _id: id,
      name: name,
      price: price,
      image: image,
      countInStock: countInStock,
      countSmall: countSmall,
      countMedium: countMedium,
      countLarge: countLarge,
      countXL: countXL
    }, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    window.location.reload(false);
  };

  const deleteHandler = async (product) => {
    const token = await getAccessTokenSilently();
    const body = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }

    axios.delete('/api/products/' + product._id, body)
      .then(res => {

      })

    window.location.reload(false);
  };

  const uploadFileHandler = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'hurstImages')
    // setLoading(true)
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dfpkblfrw/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()

    setImage(file.secure_url)
    console.log(file.secure_url);
    // setLoading(false)    
  };

  return (
    <div className="content content-margined">
      <div>
        {!modalVisible && <button className="button btn btn-create btn-primary style-button font-style-create" onClick={() => openModalCreate({})}>
          Create Product
        </button>}
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container font-style">
              <li>
                {isUpdate ? <h2 className="header-top font-style">Update Product</h2> : <h2 className="header-top font-style">Create Product</h2>}
              </li>
              {/* <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li> */}

              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name || ''}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={price || ''}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>

                <input type="file" onChange={uploadFileHandler}></input>
                {/* {uploading && <div>Uploading...</div>} */}
              </li>

              <li>
                <label htmlFor="countInStock">CountInStock</label>
                <input
                className="input-text"
                  type="text"
                  name="countInStock"
                  value={countInStock || ''}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">Small Count</label>
                <input
                  type="text"
                  name="countSmall"
                  value={countSmall || ''}
                  id="countSmall"
                  onChange={(e) => setCountSmall(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">Medium Count</label>
                <input
                  type="text"
                  name="countMedium"
                  value={countMedium || ''}
                  id="countMedium"
                  onChange={(e) => setCountMedium(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">Large Count</label>
                <input
                  type="text"
                  name="countLarge"
                  value={countLarge || ''}
                  id="countLarge"
                  onChange={(e) => setCountLarge(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">XL Count</label>
                <input
                  type="text"
                  name="countLarge"
                  value={countXL || ''}
                  id="countLarge"
                  onChange={(e) => setCountXL(e.target.value)}
                ></input>
              </li>

              <li>
                {/* <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'}
                </button> */}
                {isUpdate ? <button onClick={(e) => updateClick(e)} className="button btn btn-primary style-button font-style-action">Update</button> : <button type="submit" className="button btn btn-primary style-button font-style-action">Create</button>}
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button btn btn-create style-button font-style-create"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
      {!modalVisible && (
        <div className="product-list">
          <table className="table font-style">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <button className="button btn btn-info style-button font-style-create info-btn" onClick={() => openModalUpdate(product)}>
                      Edit
                  </button>{' '}
                    <button
                      className="button btn btn-danger style-button font-style-create delete-btn"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

  );
}
export default withAuthenticationRequired(ProductForm, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});