const initialState = { loading: false, productData: null }

function productReducer(state, action) {
  switch (action.type) {
    case "FETCH_PRODUCT": {
      return {
        ...state,
        loading: true,
        productData: null
      };
    }
    case "FETCH_PRODUCT_SUCCESS": {
      return {
        ...state,
        loading: false,
        productData: action.payload
      };
    }

    case "RESET": {
      return initialState;
    }

    default:
      throw new Error( `Not supported action ${action.type}` );
  }
}