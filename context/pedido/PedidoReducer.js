import { QUANTITY_PRODUCTS, SELECT_CLIENT, SELECT_PRODUCT, TOTAL } from '../../types'



export const PedidoReducer = (state, action) => {

  switch (action.type) {
    case SELECT_CLIENT:
      return {
        ...state,
        client: action.payload
      }
    case SELECT_PRODUCT:
      return {
        ...state,
        products: action.payload
      }
    case QUANTITY_PRODUCTS:
      return {
        ...state,
        products: state.products.map(product => product.id === action.payload.id ? action.payload : product)
      }
    case TOTAL:
      return {
        ...state,
        total: state.products.reduce((total, product) => total += product.precio * product.cantidad, 0)
      }

    default:
      return state;
  }
}
