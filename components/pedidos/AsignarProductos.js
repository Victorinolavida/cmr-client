import { useQuery } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { PedidoContext } from '../../context/pedido/PedidioContext'
import { GET_PRODUCTS } from '../../pages/productos'


export const AsignarProducto = () => {

  const { data, loading } = useQuery(GET_PRODUCTS);


  const [products, setProducts] = useState([])

  const { addProduct } = useContext(PedidoContext)

  useEffect(() => {

    addProduct(products)

  }, [products])


  const selectProduct = (product) => {
    setProducts(product)
  }


  if (loading) return null;

  const { getProducts } = data;

  return (
    <>
      <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'
      >2.- Selecciona los productos</p>
      <Select
        className='mt-3'
        isMulti
        options={getProducts}
        onChange={selectProduct}
        getOptionLabel={op => `${op.nombre} - ${op.existencias} disponibles`}
        placeholder='Seleccine el clientes'
        noOptionsMessage={() => 'No se encontro ese producto'}
        getOptionValue={op => op.id}
      />

    </>
  )
}
