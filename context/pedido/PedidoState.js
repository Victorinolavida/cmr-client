import React, { useReducer } from 'react';
import { PedidoContext } from './PedidioContext';
import { QUANTITY_PRODUCTS, SELECT_CLIENT, SELECT_PRODUCT, TOTAL } from '../../types'
import { PedidoReducer } from './PedidoReducer';


export const PedidoState = ({ children }) => {

  const INITIAL_STATE = {
    client: {},
    products: [],
    paid: 0
  }

  const [state, dispatch] = useReducer(PedidoReducer, INITIAL_STATE)

  const addClient = (client) => {
    dispatch({ type: SELECT_CLIENT, payload: client })
  }

  const addProduct = (products) => {

    let newState;

    if (state.products.length > 0) {

      newState = products.map(product => {
        const newProduct = state
          .products.find(productState => productState.id === product.id)
        return { ...product, ...newProduct }

      })


    } else {
      newState = products
    }

    dispatch({ type: SELECT_PRODUCT, payload: newState })
  }

  const quantityProducts = (newProduct) => {
    dispatch({ type: QUANTITY_PRODUCTS, payload: newProduct })
  }

  const updateTotal = () => {
    dispatch({ type: TOTAL })
  }

  return (
    <PedidoContext.Provider value={{
      ...state, addClient, addProduct, quantityProducts, updateTotal
    }}>
      {
        children
      }
    </PedidoContext.Provider>
  )
}
