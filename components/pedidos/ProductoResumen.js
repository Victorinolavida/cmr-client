import React, { useContext, useEffect, useState } from 'react'
import { PedidoContext } from '../../context/pedido/PedidioContext';

export const ProductoResumen = ({ product }) => {

  const [pedidoQuentity, setPedidoQuentity] = useState(0);
  const { quantityProducts, updateTotal } = useContext(PedidoContext)

  const { nombre, precio } = product;


  useEffect(() => {
    updateProduct()
    updateTotal()


  }, [pedidoQuentity])

  const updateProduct = () => {
    const newProduct = { ...product, cantidad: +pedidoQuentity }
    quantityProducts(newProduct)
  }

  return (
    <div className='flex justify-between md:items-center mt-5'>
      <div className='w-3/4 mb-2 md:mb-0'>
        <p className='text-ms'>{nombre}</p>
        <p>${precio}</p>


      </div>

      <input type="number" placeholder='cantidad'
        className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4'
        onChange={(e) => setPedidoQuentity(e.target.value)}
        value={pedidoQuentity}
      />

    </div>

  )
}
