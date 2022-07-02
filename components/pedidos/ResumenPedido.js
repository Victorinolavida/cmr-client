import React, { useContext } from 'react'
import { PedidoContext } from '../../context/pedido/PedidioContext'
import { ProductoResumen } from './ProductoResumen'

export const ResumenPedido = () => {

  const { products } = useContext(PedidoContext)
  return (
    <>
      <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'
      >3.- justa las cantidades del producto</p>
      {

        products.length > 0 ? (
          <>
            {
              products.map(product => (
                <ProductoResumen key={product.id} product={product} />
              ))
            }
          </>
        ) :
          (<p className='mt-5 text-sm'>Aun no has seleccionando ningun producto</p>)

      }
    </>
  )
}
